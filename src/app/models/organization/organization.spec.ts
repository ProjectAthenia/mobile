import {Organization} from './organization';

describe('Test Organization Model', () => {

    it('Make sure that the organization model is being built properly', () => {
        const model = new Organization({
            id: 4,
            name: 'An Organization',
        });

        expect(model).toBeTruthy();
    });
});
