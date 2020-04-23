import {AuthManagerService} from './auth-manager.service';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('Test the auth manager provider', () => {

    let storageProvider: StorageProvider;
    let authManager: AuthManagerService;

    beforeEach(() => {
        storageProvider = new StorageProvider(new NativeStorageMock());
        authManager = new AuthManagerService(storageProvider);
    });

    it('Makes sure that the needs refresh function returns false when the auth token is within the last 55 minutes', async () => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Promise.resolve(Date.now() - (5 * 60 * 1000)));

        const result = await authManager.needsRefresh();

        expect(result).toBeFalsy();
    });

    it('Makes sure that the needs refresh function returns true when the auth token is older then 55 minutes', async () => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Promise.resolve(Date.now() - (56 * 60 * 1000)));

        const result = await authManager.needsRefresh();

        expect(result).toBeTruthy();
    });
});
