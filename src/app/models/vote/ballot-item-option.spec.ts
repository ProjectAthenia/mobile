import {BallotItemOption} from './ballot-item-option';
import {User} from '../user/user';

describe('Test BallotItemOption Model', () => {

    it('Make sure that the ballot item option model is being built properly', () => {
        const model = new BallotItemOption({
            id: 4,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the ballot item option model subject is being returned properly', () => {
        let model = new BallotItemOption({
            subject_type: 'user',
            subject: {
                id: 234,
            }
        });

        expect(model.subject.constructor).toBe(User);
    });
});
