import {BallotCompletion} from './ballot-completion';
import {Vote} from './vote';

describe('Test BallotCompletion Model', () => {

    it('Make sure that the ballot completion model is being built properly', () => {
        const model = new BallotCompletion({
            id: 4,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the ballot completion model is being built properly with options', () => {
        const model = new BallotCompletion({
            id: 4,
            votes: [
                {
                    id: 234,
                }
            ]
        });

        expect(model).toBeTruthy();
        expect(model.votes[0].constructor).toBe(Vote);
    });
});
