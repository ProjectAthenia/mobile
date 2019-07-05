import {Events, LoadingController, ToastController} from "@ionic/angular";
import {HTTP} from '@ionic-native/http/ngx';
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {HTTPMock, NativeStorageMock} from "../../../../test-config/mocks/plugins";
import {EventsMock} from '../../../../test-config/mocks-ionic';
import {StorageProvider} from '../storage/storage';
import {RequestHandlerProvider} from "./request-handler";
import {AuthManagerProvider} from '../auth-manager/auth-manager';
import {environment} from '../../../environments/environment';

describe('Test Request Handler provider', () => {

    let http : HTTP;
    let storageProvider : StorageProvider;
    let toast : ToastController;
    let loadingController: LoadingController;
    let events : Events;
    let authManager: AuthManagerProvider;
    let requestHandlerProvider : RequestHandlerProvider;

    beforeEach(() => {
        http = new HTTPMock();
        storageProvider = new StorageProvider(new NativeStorage());
        toast = new ToastController();
        loadingController = new LoadingController();
        events = new EventsMock();
        authManager = new AuthManagerProvider(new StorageProvider(new NativeStorageMock()));

        requestHandlerProvider = new RequestHandlerProvider(http, storageProvider, authManager,  toast, loadingController, events);
    });


    it('Make sure the buildUrl function works in live mode', async () => {

        environment.api_url = 'http://test.test';

        let result = await requestHandlerProvider.buildUrl('');

        expect(result).toBe('http://test.test');
    });

    it('Make sure the refreshToken function is called properly', async () => {
        spyOn(storageProvider, 'loadAuthToken').and.returnValue(Promise.resolve('old token'));
        spyOn(http, 'post').and.returnValue(new Promise((resolve) => {
            resolve({
                status: 200,
                headers: {},
                url: '',
                data: '{\"token\": \"a new token\"}',
            });
        }));
        spyOn(storageProvider, 'saveAuthToken');

        await requestHandlerProvider.refreshToken();

        expect(http.post).toHaveBeenCalled();
        expect(storageProvider.saveAuthToken).toHaveBeenCalledWith('a new token');
    });

    it('Make sure that requires auth sends the logout event on needsRefresh failure', async () => {
        spyOn(authManager, 'needsRefresh').and.returnValue(new Promise((resolve, reject) => {
            reject();
        }));
        spyOn(events, 'publish');

        await requestHandlerProvider.requiresAuth();

        expect(authManager.needsRefresh).toHaveBeenCalled();
        expect(events.publish).toHaveBeenCalledWith('logout');
    });

    it('Make sure that requires auth loads the auth token when it does not need to be refreshed', async () => {
        spyOn(authManager, 'needsRefresh').and.returnValue(new Promise(resolve => {
            resolve(false);
        }));
        spyOn(storageProvider, 'loadAuthToken').and.returnValue(new Promise(resolve => {
            resolve('a token');
        }));

        await requestHandlerProvider.requiresAuth();

        expect(authManager.needsRefresh).toHaveBeenCalled();
        expect(storageProvider.loadAuthToken).toHaveBeenCalled();

        expect(requestHandlerProvider.authToken).toBe('a token');
    });

    it('Make sure that requires auth sends the logout event on loadAuthToken failure', async () => {
        spyOn(authManager, 'needsRefresh').and.returnValue(new Promise(resolve => {
            resolve(false);
        }));
        spyOn(storageProvider, 'loadAuthToken').and.returnValue(new Promise((resolve, reject)=> {
            reject();
        }));
        spyOn(events, 'publish');

        await requestHandlerProvider.requiresAuth();

        expect(authManager.needsRefresh).toHaveBeenCalled();
        expect(storageProvider.loadAuthToken).toHaveBeenCalled();
        expect(events.publish).toHaveBeenCalledWith('logout');
    });

    it('Make sure that requires auth attempts to refresh the token when the token is expired', async () => {
        spyOn(authManager, 'needsRefresh').and.returnValue(new Promise(resolve => {
            resolve(true);
        }));

        // refresh request
        spyOn(http, 'post').and.returnValue(new Promise((resolve) => {
            resolve({
                status: 200,
                headers: {},
                url: '',
                data: '{\"token\": \"a new token\"}',
            });
        }));
        spyOn(storageProvider, 'saveAuthToken');

        spyOn(storageProvider, 'loadAuthToken').and.returnValue(new Promise(resolve => {
            resolve('a new token');
        }));

        await requestHandlerProvider.requiresAuth();

        expect(authManager.needsRefresh).toHaveBeenCalled();
        expect(storageProvider.loadAuthToken).toHaveBeenCalled();
        expect(http.post).toHaveBeenCalled();
        expect(storageProvider.saveAuthToken).toHaveBeenCalledWith('a new token');

        expect(requestHandlerProvider.authToken).toBe('a new token');
    });
});