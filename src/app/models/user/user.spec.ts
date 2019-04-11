///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
import {User} from './user';
import {PaymentMethod} from '../payment/payment-method';

describe('Test User Model', () => {

    it('Make sure that the user model is being built properly', () => {
        const model = new User({
            id: 4,
            name: 'Sven Nevs',
            email: 'test@test.com',
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the user model is being built properly with related payment methods', () => {
        const model = new User({
            id: 4,
            name: 'Sven Nevs',
            email: 'test@test.com',
            payment_methods: [
                {
                    id: 42,
                    identifier: '1234',
                },
            ],
        });

        expect(model).toBeTruthy();
        expect(model.payment_methods[0].constructor).toBe(PaymentMethod);
    });
});
