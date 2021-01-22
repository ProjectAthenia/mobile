import {BallotItem} from './ballot-item';
import {Ballot} from './ballot';

describe('Test Ballot Model', () => {

    it('Make sure that the ballot model is being built properly', () => {
        const model = new Ballot({
            id: 4,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the ballot model is being built properly with options', () => {
        const model = new Ballot({
            id: 4,
            ballot_items: [
                {
                    id: 234,
                }
            ]
        });

        expect(model).toBeTruthy();
        expect(model.ballot_items[0].constructor).toBe(BallotItem);
    });
});
