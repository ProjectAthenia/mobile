import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import Messaging from './messaging';
import {User} from '../../../models/user/user';
import {Thread} from '../../../models/user/thread';
import {Message} from '../../../models/user/message';

describe('Test the auth requests', () => {
    let requestHandler: RequestHandlerProvider;
    let messaging: Messaging;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        messaging = new Messaging(requestHandler);
    });

    it('Creates a request for getting a list of threads', async () => {
        spyOn(requestHandler, 'requiresAuth').and.returnValue(Promise.resolve());
        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [{
                id: 324,
            }, {
                id: 56423,
            }]
        }));
        const result = await messaging.getThreads(new User({}), false);
        expect(result.length).toBe(2);
        expect(result[0].constructor).toBe(Thread);
        expect(result[1].constructor).toBe(Thread);
        expect(result[0].id).toBe(324);
        expect(result[1].id).toBe(56423);
    });

    it('Creates a request for creating a new thread', async () => {
        spyOn(requestHandler, 'requiresAuth').and.returnValue(Promise.resolve());
        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
        }));
        const result = await messaging.createThread(new User({}), new User({}));
        expect(result.constructor).toBe(Thread);
    });

    it('Creates a request for getting a list of messages', async () => {
        spyOn(requestHandler, 'requiresAuth').and.returnValue(Promise.resolve());
        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [{
                id: 324,
            }, {
                id: 56423,
            }]
        }));
        const result = await messaging.getMessages(new User({}), new Thread({}), false);
        expect(result.length).toBe(2);
        expect(result[0].constructor).toBe(Message);
        expect(result[1].constructor).toBe(Message);
        expect(result[0].id).toBe(324);
        expect(result[1].id).toBe(56423);
    });

    it('Creates a request for marking a message as sent', async () => {
        spyOn(requestHandler, 'requiresAuth').and.returnValue(Promise.resolve());
        spyOn(requestHandler, 'put').and.returnValue(Promise.resolve({
            id: 324,
        }));
        const result = await messaging.markMessageAsSeen(new User({}), new Thread({}), new Message({}));
        expect(result.constructor).toBe(Message);
    });

    it('Creates a request for creating a new message', async () => {
        spyOn(requestHandler, 'requiresAuth').and.returnValue(Promise.resolve());
        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
        }));
        const result = await messaging.createMessage(new User({}), new Thread({}), '');
        expect(result.constructor).toBe(Message);
    });
});
