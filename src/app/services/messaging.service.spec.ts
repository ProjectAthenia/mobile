import { TestBed } from '@angular/core/testing';

import {MessagingService} from './messaging.service';
import {Thread} from '../models/user/thread';

describe('UserService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MessagingService = TestBed.get(MessagingService);
        expect(service).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: MessagingService = TestBed.get(MessagingService);
        service.cacheThread(new Thread({
            id: 45252,
        }));
        expect(service.loadedThreads[45252]).toBeTruthy();
    });

    it('should return null when a user is not found', () => {
        const service: MessagingService = TestBed.get(MessagingService);

        const result = service.getThread(45252);
        expect(result).toBeNull();
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
