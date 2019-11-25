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
});
