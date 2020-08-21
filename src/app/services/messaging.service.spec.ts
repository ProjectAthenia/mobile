import { TestBed } from '@angular/core/testing';

import {MessagingService} from './messaging.service';
import {Thread} from '../models/user/thread';
import {RequestsProvider} from '../providers/requests/requests';
import RequestsProviderMock from '../providers/requests/requests.mock';
import {StorageProvider} from '../providers/storage/storage';
import {NativeStorageMock} from '../../../test-config/mocks/plugins';

describe('MessageService', () => {
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    beforeEach(() => TestBed.configureTestingModule({

        providers: [
            { provide: RequestsProvider, useValue: requestsProvider},
            { provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
        ],
    }));

    it('should be created', () => {
        const service: MessagingService = TestBed.get(MessagingService);
        expect(service).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: MessagingService = TestBed.get(MessagingService);
        expect(service.loadedThreads.length).toBe(0);
        service.cacheThread(new Thread({
            id: 45252,
        }));
        expect(service.loadedThreads.length).toBe(1);
    });

    it('should return null when a user is not found', () => {
        const service: MessagingService = TestBed.get(MessagingService);

        const result = service.getThread(45252);
        expect(result).toBeUndefined();
    });

    it('should get a user properly', () => {
        const service: MessagingService = TestBed.get(MessagingService);

        const thread = new Thread({
            id: 45252,
        });
        service.cacheThread(thread);

        const result = service.getThread(45252);
        expect(thread).toBe(result);
    });
});
