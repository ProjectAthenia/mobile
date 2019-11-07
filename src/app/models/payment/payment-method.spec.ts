import {PaymentMethod} from './payment-method';

describe('Test Payment Method Model', () => {

    it('Make sure that the payment method model is being built properly', () => {
        const model = new PaymentMethod({
            id: 4,
            identifier: '1234',
            email: 'test@test.com',
        });

        expect(model).toBeTruthy();
    });
});
