import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import {User} from '../../../models/user/user';
import Social from './social';
import {Contact} from '../../../models/user/contact';

describe('Test the search requests', () => {
    let requestHandler: RequestHandlerProvider;
    let social: Social;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        social = new Social(requestHandler);
    });

    it('Creates a request for loading a user', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            id: 324,
            first_name: 'James',
            last_name: 'Blue',
        }));
        const result = await social.loadUser(324);
        expect(result.constructor).toBe(User);
    });

    it('Creates a request for loading a list of contacts', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [
                {
                    id: 324,
                    initiated_by_id: 32432,
                    requested_id: 8932,
                    confirmed_at: null,
                    denied_at: null,
                },
                {
                    id: 325,
                    initiated_by_id: 4353,
                    requested_id: 32432,
                    confirmed_at: null,
                    denied_at: null,
                }
            ]
        }));
        const me = new User({
            id: 32432,
        });
        const result = await social.loadContacts(me);
        expect(result[0].constructor).toBe(Contact);
        expect(result[1].constructor).toBe(Contact);
    });

    it('Creates a request for creating a new contact', async () => {

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
            initiated_by_id: 32432,
            requested_id: 8932,
            confirmed_at: null,
            denied_at: null,
        }));
        const me = new User({
            id: 32432,
        });
        const requested = new User({
            id: 8932,
        });
        const result = await social.createContact(me, requested);
        expect(result.constructor).toBe(Contact);
        expect(result.requested_id).toBe(8932);
    });

    it('Creates a request for denying a contact request', async () => {

        spyOn(requestHandler, 'put').and.returnValue(Promise.resolve({
            id: 324,
            initiated_by_id: 32432,
            requested_id: 8932,
            confirmed_at: null,
            denied_at: '2019-10-10 12:12:!2',
        }));
        const me = new User({
            id: 32432,
        });
        const contact = new Contact({
            id: 324,
            initiated_by_id: 32432,
            requested_id: 8932,
            confirmed_at: null,
            denied_at: null,
        });
        const result = await social.denyContact(me, contact);
        expect(result.constructor).toBe(Contact);
        expect(result.requested_id).toBe(8932);
    });

    it('Creates a request for confirming a contact request', async () => {

        spyOn(requestHandler, 'put').and.returnValue(Promise.resolve({
            id: 324,
            initiated_by_id: 32432,
            requested_id: 8932,
            confirmed_at: null,
            denied_at: '2019-10-10 12:12:!2',
        }));
        const me = new User({
            id: 32432,
        });
        const contact = new Contact({
            id: 324,
            initiated_by_id: 32432,
            requested_id: 8932,
            confirmed_at: null,
            denied_at: null,
        });
        const result = await social.denyContact(me, contact);
        expect(result.constructor).toBe(Contact);
        expect(result.requested_id).toBe(8932);
    });
});
