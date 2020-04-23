import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {StorageProvider} from '../../providers/storage/storage';

/**
 * Used to manage the authentication of the app
 */
@Injectable({
    providedIn: 'root'
})
export class AuthManagerService {

    /**
     * The refresh rate for when to refresh the token
     */
    static TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

    /**
     * The logout observer
     */
    readonly logoutObservable: Observable<any>;

    /**
     * The subscriber for the logout
     */
    private logoutSubscribers: Subscriber<any>[] = [];

    /**
     * The observer for listening to auth refresh events
     */
    readonly authRefreshedObserver: Observable<string>;

    /**
     * The subscriber to listen for auth refreshed events
     */
    private authRefreshedSubscribers: Subscriber<string>[] = [];

    /**
     * Default Constructor
     * @param storageProvider
     */
    constructor(private storageProvider: StorageProvider) {
        this.logoutObservable = new Observable((subscriber) => {
            this.logoutSubscribers.push(subscriber);
        });
        this.authRefreshedObserver = new Observable((subscriber) => {
            this.authRefreshedSubscribers.push(subscriber);
        });
    }

    /**
     * Checks if the last retrieved token needs to be refreshed
     */
    needsRefresh(): Promise<boolean> {
        return new Promise((resolve, reject) => {

            this.storageProvider.loadReceivedAt().then(receivedAt => {

                resolve(receivedAt + AuthManagerService.TOKEN_REFRESH_INTERVAL < Date.now());
            });
        });
    }

    /**
     * gets the logout observer for our user to link to
     */
    getLogoutObservable(): Observable<string> {
        return this.logoutObservable;
    }

    /**
     * Gets the observer for the auth refreshed events
     */
    getAuthRefreshedObserver(): Observable<string> {
        return this.authRefreshedObserver;
    }

    /**
     * Runs the actual logout
     */
    logOut() {
        this.storageProvider.logOut().catch(console.error);
        this.logoutSubscribers.forEach(subscriber => {
            subscriber.complete();
        });
    }

    /**
     * The callback for when the auth has been refreshed
     * @param token
     */
    authRefreshed(token: string) {
        this.authRefreshedSubscribers.forEach(subscriber => {
            subscriber.next(token);
        });
    }
}
