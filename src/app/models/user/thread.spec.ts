import {Thread} from './thread';
import {User} from './user';
import {Message} from './message';

describe('Test Thread Model', () => {

    it('Make sure that the contact model is being built properly', () => {
        const model = new Thread({
            id: 4,
            users: [
                {
                    id: 2452,
                }
            ],
            last_message: {
                id: 3453,
                data: {
                    message: 'hi',
                },
            },
        });

        expect(model).toBeTruthy();
        expect(model.users[0].constructor).toBe(User);
        expect(model.last_message.constructor).toBe(Message);
    });

    it('hasUserSeenThread returns true when the user sent the last message', () => {
        const me = new User({
            id: 3453,
        });
        const model = new Thread({
            id: 4,
            last_message: {
                id: 235,
                from_id: 3453,
            },
        });

        expect(model.hasUserSeenThread(me)).toBeTruthy();
    });

    it('hasUserSeenThread returns true when the sent at field is set properly', () => {
        const me = new User({
            id: 3453,
        });
        const model = new Thread({
            id: 4,
            last_message: {
                id: 235,
                from_id: 436,
                seen_at: '2018-09-12',
            },
        });

        expect(model.hasUserSeenThread(me)).toBeTruthy();
    });

    it('hasUserSeenThread returns false when the last message has not been seen', () => {
        const me = new User({
            id: 3453,
        });
        const model = new Thread({
            id: 4,
            last_message: {
                id: 235,
                from_id: 436,
            },
        });

        expect(model.hasUserSeenThread(me)).toBeFalsy();
    });
});
