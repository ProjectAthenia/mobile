import {Message} from './message';

describe('Test Thread Model', () => {

    it('Make sure that the contact model is being built properly', () => {
        const model = new Message({
            id: 4,
            data: {
                message: 'Hi',
            }
        });

        expect(model).toBeTruthy();
        expect(model.data.message).toBe('Hi');
    });
});
