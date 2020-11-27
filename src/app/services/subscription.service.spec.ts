import { TestBed } from '@angular/core/testing';

import RequestsProviderMock from '../providers/requests/requests.mock';
import {SubscriptionService} from './subscription.service';
import {UserService} from './user.service';
import {StorageProvider} from '../providers/storage/storage';
import {NativeStorageMock} from '../../../test-config/mocks/plugins';

describe('SubscriptionService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SubscriptionService = new SubscriptionService(
            new RequestsProviderMock(),
            new UserService(
                new RequestsProviderMock(),
                new StorageProvider(new NativeStorageMock())
            )
        );
        expect(service).toBeTruthy();
    });

});
