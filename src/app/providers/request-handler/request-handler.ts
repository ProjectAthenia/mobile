import {HTTP, HTTPResponse} from '@ionic-native/http/ngx';
import {Injectable} from '@angular/core';
import {StorageProvider} from '../storage/storage';
import {Events, LoadingController, ToastController} from '@ionic/angular';
import {AuthManagerProvider} from '../auth-manager/auth-manager';
import {environment} from '../../../environments/environment';

@Injectable()
export class RequestHandlerProvider {

    /**
     * The total amount of loads being ran throughout the app
     * @type {number}
     */
    static LOAD_INDICATOR_COUNT = 0;

    /**
     * The current auth token, for any requests needing authorization
     * @type {string|null}
     */
    authToken: string = null;

    /**
     * The current loading indicator
     */
    loadingIndicator = null;

    /**
     * Whether or not the token is currently refreshing
     */
    refreshRequest: Promise<any> = null;

    /**
     * Default constructor for this provider
     * @param {HTTP} http
     * @param {StorageProvider} storageProvider
     * @param authManager
     * @param {ToastController} toastController
     * @param loadingController
     * @param events
     */
    constructor(private http: HTTP,
                private storageProvider: StorageProvider,
                private authManager: AuthManagerProvider,
                private toastController: ToastController,
                private loadingController: LoadingController,
                private events: Events) {
    }

    /**
     * builds the url based on whether or not the app is in test mode
     * @param route
     */
    async buildUrl(route: string): Promise<string> {
        return Promise.resolve(environment.api_url + route);
    }

    /**
     * Refreshes a token properly
     */
    async refreshToken(): Promise<any> {

        try {
            this.authToken = await this.storageProvider.loadAuthToken();
            if (this.refreshRequest == null) {
                this.refreshRequest = this.post('auth/refresh', false, false, {});
            }
            const response = await this.refreshRequest;
            const token = response.token;
            this.authToken = token;
            await this.storageProvider.saveAuthToken(token);
            this.refreshRequest = null;
            return Promise.resolve();
        } catch(error) {
            this.events.publish('logout');
            return Promise.reject();
        }
    }

    /**
     * Loads the auth token, and returns a promise for when the token has been loaded
     * This should be done every time we need the auth token in case it is update from somewhere else
     * @returns {Promise<void>}
     */
    async requiresAuth():  Promise<void> {
        const needsRefresh = await this.authManager.needsRefresh().catch(error => {
            this.events.publish('logout');
        });

        if (needsRefresh) {
            await this.refreshToken();
            return Promise.resolve();
        }
        return this.storageProvider.loadAuthToken().then(
            data => {
                this.authToken = data;
            }
        ).catch(error => {
            this.events.publish('logout');
        });
    }

    /**
     * Loads all headers for the request
     * @returns {any}
     */
    private headers() {
        if (this.authToken != null) {
            return {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authToken
            };
        }

        return {
            'Content-Type': 'application/json',
        };
    }

    /**
     * Takes a request object, and adds all default promise handlers to it
     * @param {Promise<HTTPResponse>} request
     * @param showLoading
     * @param customErrorHandlers
     * @param passRaw
     */
    private async runRequest(request: Promise<HTTPResponse>, showLoading: boolean,
                             customErrorHandlers: any = null, passRaw = false): Promise<any> {

        return request
            .then(response => {

                if (showLoading) {
                    this.decrementLoadIndicator();
                }

                let responseData;
                if (passRaw) {
                    responseData = response;
                } else {
                    responseData = JSON.parse(response.data);
                }

                return new Promise<object> (resolve => {
                    resolve(responseData);
                });
            })
            .catch(
                error => {

                    if (showLoading) {
                        this.decrementLoadIndicator();
                    }

                    if (customErrorHandlers) {
                        for (const statusCode in customErrorHandlers) {
                            if (error.status == statusCode) {
                                customErrorHandlers[statusCode](error);

                                return Promise.reject(error);
                            }
                        }
                    }

                    let message = null;
                    switch (error.status) {
                        case -1:
                        case 0:
                        case 1:
                        case 3:
                            message = 'Server timeout error. Please check back later.';
                            console.error('Timeout Error', error);
                            break;

                        case 500:
                            message = 'An error has occurred on our servers! If this problem persists, please contact us.';
                            console.error('Server Error', error);
                            break;

                        case 400:
                            message = 'An error has occurred! If this problem persists, please contact us.';
                            console.error('Validation Error', error, error.error);
                            break;

                        case 401:
                            RequestHandlerProvider.LOAD_INDICATOR_COUNT = 0;
                            this.decrementLoadIndicator();
                            this.events.publish('logout');
                            break;

                        default:
                            message = 'An unknown error #' + error.status + ' has occurred. If this problem persists, please contact us.';
                            console.error('Unknown Status Error', error);
                            break;
                    }

                    if (message) {
                        this.toastController.create({
                            message: message,
                            duration: 2000,
                            position: 'bottom',
                        }).then(
                            toast => {
                                toast.present();
                            }
                        );
                    }

                    return Promise.reject(error);
                }
            );
    }

    /**
     * Increments the loading indicator for us
     */
    private async incrementLoading() {
        if (RequestHandlerProvider.LOAD_INDICATOR_COUNT === 0) {
            RequestHandlerProvider.LOAD_INDICATOR_COUNT++;
            if (this.loadingIndicator != null) {
                this.loadingIndicator.dismiss();
                this.loadingIndicator = null;
            }
            this.loadingIndicator = await this.loadingController.create({
                message: 'Loading...',
                spinner: 'dots',
                translucent: true,
            });
            this.loadingIndicator.present();
        } else {

            RequestHandlerProvider.LOAD_INDICATOR_COUNT++;
        }
    }

    /**
     * Lowers the load indicator amount and hides it if need be
     */
    decrementLoadIndicator() {
        if (RequestHandlerProvider.LOAD_INDICATOR_COUNT > 0) {
            RequestHandlerProvider.LOAD_INDICATOR_COUNT--;
        }

        if (RequestHandlerProvider.LOAD_INDICATOR_COUNT <= 0) {

            this.loadingController.dismiss().catch(console.error);
        }
    }

    /**
     * Runs a get request on a rute
     * @param {string} route
     * @param requiresAuth
     * @param showLoading
     * @param expands
     * @param customErrorHandlers
     * @param filter
     * @param search
     * @param limit
     */
    async get(route: string, requiresAuth: boolean, showLoading: boolean, expands: any, customErrorHandlers: any = null,
              filter: any = null, search: any = null, limit: number = null): Promise<any> {

        if (showLoading) {
            await this.incrementLoading();
        }
        if (requiresAuth) {
            await this.requiresAuth();
        }
        const data = {};

        for (const expand of expands) {
            data['expand['  + expand + ']'] = '*';
        }

        if (filter) {
            for (const key of Object.keys(filter)) {
                data['filter[' + key + ']'] = filter[key];
            }
        }

        if (search) {

            for (const key of Object.keys(search)) {
                const term = search[key];
                if (term instanceof Array)  {
                    for (const lookup of term) {

                        data['search[' + key + '][' +  (Object.keys(data).length) + ']'] = 'like,*' + lookup + '*';
                    }
                } else {
                    data['search[' + key + ']'] = 'like,*' + search[key] + '*';
                }
            }
        }

        if (limit) {
            data['limit'] = limit.toString();
        }

        const path = await this.buildUrl(route);
        const request = this.http.get(path, data, this.headers());

        return this.runRequest(request, showLoading, customErrorHandlers);
    }

    /**
     * Runs a post request on route
     * @param {string} route
     * @param requiresAuth
     * @param showLoading
     * @param data
     * @param customErrorHandlers
     * @param passRaw
     */
    async post(route: string, requiresAuth: boolean, showLoading: boolean,
               data: any, customErrorHandlers: any = null, passRaw = false): Promise<any> {

        if (showLoading) {
            await this.incrementLoading();
        }
        if (requiresAuth) {
            await this.requiresAuth();
        }
        this.http.setDataSerializer('json');
        const path = await this.buildUrl(route);
        const request = this.http.post(path, data, this.headers());

        return this.runRequest(request, showLoading, customErrorHandlers, passRaw);
    }

    /**
     * Runs a patch request on route
     * @param {string} route
     * @param requiresAuth
     * @param showLoading
     * @param data
     * @param customErrorHandlers
     */
    async patch(route: string, requiresAuth: boolean, showLoading: boolean,
                data: any, customErrorHandlers: any = null): Promise<any> {

        if (showLoading) {
            await this.incrementLoading();
        }
        if (requiresAuth) {
            await this.requiresAuth();
        }
        this.http.setDataSerializer('json');
        const path = await this.buildUrl(route);
        const request = this.http.patch(path, data, this.headers());

        return this.runRequest(request, showLoading, customErrorHandlers);
    }

    /**
     * Runs a delete request on route
     * @param {string} route
     * @param requiresAuth
     * @param showLoading
     * @param customErrorHandlers
     */
    async delete(route: string, requiresAuth: boolean, showLoading: boolean, customErrorHandlers: any = null): Promise<any> {

        if (showLoading) {
            await this.incrementLoading();
        }
        if (requiresAuth) {
            await this.requiresAuth();
        }
        this.http.setDataSerializer('json');
        const path = await this.buildUrl(route);
        const request = this.http.delete(path, {}, this.headers());

        return this.runRequest(request, showLoading, customErrorHandlers, true);
    }

    /**
     * Runs a put request on route
     * @param {string} route
     * @param requiresAuth
     * @param showLoading
     * @param data
     * @param customErrorHandlers
     */
    async put(route: string, requiresAuth: boolean, showLoading: boolean,
                data: any, customErrorHandlers: any = null): Promise<any> {

        if (showLoading) {
            await this.incrementLoading();
        }
        if (requiresAuth) {
            await this.requiresAuth();
        }
        this.http.setDataSerializer('json');
        const path = await this.buildUrl(route);
        const request = this.http.put(path, data, this.headers());

        return this.runRequest(request, showLoading, customErrorHandlers);
    }
}
