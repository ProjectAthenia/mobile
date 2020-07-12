import {Organization} from './organization';

describe('Test Payment Method Model', () => {

    it('Make sure that the payment method model is being built properly', () => {
        const model = new Organization({
            id: 4,
            name: 'An Organization',
        });

        expect(model).toBeTruthy();
    });
});
