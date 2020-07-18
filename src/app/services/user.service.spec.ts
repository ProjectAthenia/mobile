import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {User} from '../models/user/user';
import {RequestsProvider} from '../providers/requests/requests';
import {StorageProvider} from '../providers/storage/storage';
import {NativeStorageMock} from '../../../test-config/mocks/plugins';
import RequestsProviderMock from '../providers/requests/requests.mock';

describe('UserService', () => {
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    beforeEach(() => TestBed.configureTestingModule({

        providers: [
            { provide: RequestsProvider, useValue: requestsProvider},
            { provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
        ],
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it ('should cache the logged in user properly', () => {
        const service: UserService = TestBed.get(UserService);

        service.storeMe(new User({}));
        expect(service.getMe()).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: UserService = TestBed.get(UserService);
        service.cacheUser(new User({
            id: 45252,
        }));
        expect(service.loadedUsers[45252]).toBeTruthy();
    });

    it('should return null when a user is not found', () => {
        const service: UserService = TestBed.get(UserService);

        const result = service.getUser(45252);
        expect(result).toBeNull();
    });

    it('should get a user properly', () => {
        const service: UserService = TestBed.get(UserService);

        const user = new User({
            id: 45252,
        });
        service.cacheUser(user);

        const result = service.getUser(45252);
        expect(user).toBe(result);
    });
});
