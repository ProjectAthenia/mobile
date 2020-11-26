import {Feature} from './feature';

describe('Test Feature Model', () => {

    it('Make sure that the feature model is being built properly', () => {
        const model = new Feature({
            id: 4,
        });

        expect(model).toBeTruthy();
    });
});
