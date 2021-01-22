import {Vote} from './vote';

describe('Test Vote Model', () => {

    it('Make sure that the vote model is being built properly', () => {
        const model = new Vote({
            id: 4,
        });

        expect(model).toBeTruthy();
    });
});
