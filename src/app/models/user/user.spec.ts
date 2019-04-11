///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
import {User} from './user';
import {PaymentMethod} from '../payment/payment-method';
import {Subscription} from '../subscription/subscription';

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

    it('Make sure that the user model is being built properly with related subscriptions', () => {
        const model = new User({
            id: 4,
            name: 'Sven Nevs',
            email: 'test@test.com',
            subscriptions: [
                {
                    id: 42,
                    payment_method_id: 3252,
                    recurring: false,
                },
            ],
        });

        expect(model).toBeTruthy();
        expect(model.subscriptions[0].constructor).toBe(Subscription);
    });
});
