import {BallotItem} from './ballot-item';
import {BallotItemOption} from './ballot-item-option';

describe('Test BallotItem Model', () => {

    it('Make sure that the ballot item model is being built properly', () => {
        const model = new BallotItem({
            id: 4,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the ballot item model is being built properly with options', () => {
        const model = new BallotItem({
            id: 4,
            ballot_item_options: [
                {
                    id: 234,
                }
            ]
        });

        expect(model).toBeTruthy();
        expect(model.ballot_item_options[0].constructor).toBe(BallotItemOption);
    });
});
