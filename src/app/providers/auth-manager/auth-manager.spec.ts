import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {StorageProvider} from '../storage/storage';
import {AuthManagerProvider} from './auth-manager';

describe('Test the auth manager provider', () => {

    let storageProvider: StorageProvider;
    let authManager: AuthManagerProvider;

    beforeEach(() => {
        const nativeStorage = new NativeStorageMock();
        storageProvider = new StorageProvider(nativeStorage);
        authManager = new AuthManagerProvider(storageProvider);
    });

    it('Makes sure that the needs refresh function returns false when the auth token is within the last 55 minutes', async() => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Promise.resolve(Date.now() - (5 * 60 * 1000)));

        const result = await authManager.needsRefresh();

        expect(result).toBeFalsy();
    });

    it('Makes sure that the needs refresh function returns true when the auth token is older then 55 minutes', async() => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Promise.resolve(Date.now() - (56 * 60 * 1000)));

        const result = await authManager.needsRefresh();

        expect(result).toBeTruthy();
    });
});
