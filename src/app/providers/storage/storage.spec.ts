import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {StorageProvider} from "./storage";
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('Test Storage provider helper', () => {

    let nativeStorage : NativeStorage;
    let storageProvider : StorageProvider;

    beforeEach(() => {
        nativeStorage = new NativeStorageMock();
        storageProvider = new StorageProvider(nativeStorage);
    });

    it('should load the auth token with key auth_token', async () => {
        spyOn(nativeStorage, 'getItem').and.returnValue(
            new Promise((resolve) => {
                resolve('a token');
            })
        );

        const result = await storageProvider.loadAuthToken();

        expect(nativeStorage.getItem).toHaveBeenCalledWith('auth_token');
        expect(result).toBe('a token');
    });

    it('should load the received at date with key received_at', async () => {
        spyOn(nativeStorage, 'getItem').and.returnValue(
            new Promise((resolve) => {
                resolve(123);
            })
        );

        const result = await storageProvider.loadReceivedAt();

        expect(nativeStorage.getItem).toHaveBeenCalledWith('received_at');
        expect(result).toBe(123);
    });

    it('should load the logged in user id', async () => {
        spyOn(nativeStorage, 'getItem').and.returnValue(
            new Promise((resolve) => {
                resolve(325);
            })
        );

        const result = await storageProvider.loadLoggedInUserId();

        expect(nativeStorage.getItem).toHaveBeenCalledWith('user_id');
        expect(result).toBe(325);
    });

    it('should save the received at and token ', async () => {
        spyOn(nativeStorage, 'setItem').and.callThrough();

        spyOn(Date, 'now').and.returnValue(23154);

        await storageProvider.saveAuthToken('a token');

        expect(nativeStorage.setItem).toHaveBeenCalledWith('auth_token', 'a token');
        expect(nativeStorage.setItem).toHaveBeenCalledWith('received_at', 23154);
    });

    it('should save the logged in user id', async () => {
        spyOn(nativeStorage, 'setItem').and.callThrough();

        await storageProvider.saveLoggedInUserId(43);

        expect(nativeStorage.setItem).toHaveBeenCalledWith('user_id', 43);
    });

    it('should call the parent clear when log out is called', async () => {
        spyOn(nativeStorage, 'clear').and.callThrough();

        await storageProvider.logOut();

        expect(nativeStorage.clear).toHaveBeenCalled();
    });
});
