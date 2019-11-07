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

    it('Make sure that the getActiveSubscriptions function is filtering properly', () => {
        const model = new User({
            subscriptions: [
                {
                    id: 425,
                },
                {
                    id: 2435,
                    expires_at: '2018-01-01T12:00:12.000Z',
                },
                {
                    id: 2435,
                    expires_at: '2030-01-01T12:00:12.000Z',
                },
                {
                    id: 25,
                    expires_at: '2027-01-01T12:00:12.000Z',
                },
            ],
        });

        const result = model.getActiveSubscriptions();
        expect(result.length).toBe(3);
        expect(result[0].id).toBe(425);
        expect(result[1].id).toBe(2435);
        expect(result[2].id).toBe(25);
    });

    it('Make sure that the getCurrentSubscription function is grabbing the non-expiring subscription properly', () => {
        const model = new User({
            subscriptions: [
                {
                    id: 425,
                },
                {
                    id: 2435,
                    expires_at: '2018-01-01T12:00:12.000Z',
                },
                {
                    id: 2435,
                    expires_at: '2030-01-01T12:00:12.000Z',
                },
                {
                    id: 25,
                    expires_at: '2027-01-01T12:00:12.000Z',
                },
            ],
        });

        const result = model.getCurrentSubscription();
        expect(result).toBeTruthy();
        expect(result.id).toBe(425);
    });

    it('Make sure that the getCurrentSubscription function is grabbing the next expiring subscription properly', () => {
        const model = new User({
            subscriptions: [
                {
                    id: 2435,
                    expires_at: '2018-01-01T12:00:12.000Z',
                },
                {
                    id: 2435,
                    expires_at: '2030-01-01T12:00:12.000Z',
                },
                {
                    id: 25,
                    expires_at: '2027-01-01T12:00:12.000Z',
                },
            ],
        });

        const result = model.getCurrentSubscription();
        expect(result).toBeTruthy();
        expect(result.id).toBe(25);
    });

    it('Make sure that the getCurrentSubscription function returns null when the subscription is expired', () => {
        const model = new User({
            subscriptions: [
                {
                    id: 2435,
                    expires_at: '2018-01-01T12:00:12.000Z',
                },
            ],
        });

        const result = model.getCurrentSubscription();
        expect(result).toBeFalsy();
    });
});
