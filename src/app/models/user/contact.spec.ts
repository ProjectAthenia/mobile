import {Contact} from './contact';

describe('Test Contact Model', () => {

    it('Make sure that the contact model is being built properly', () => {
        const model = new Contact({
            id: 4,
            confirmed_at: '2019-01-21 12:32:12',
        });

        expect(model).toBeTruthy();
        expect(model.confirmed_at.getFullYear()).toBe(2019);
    });
});
