import {MembershipPlanRate} from './membership-plan-rate';
import {Subscription} from './subscription';

describe('Test Membership Plan Rate Model', () => {

    it('Make sure that the subscription model is being built properly', () => {
        const model = new Subscription( {
            payment_method_id: 3252,
            recurring: false,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the subscription model is being built properly with a membership plan connected', () => {
        const model = new Subscription( {
            payment_method_id: 3252,
            recurring: false,
            membership_plan_rate: {
                active: false,
                cost: 3.99,
            }
        });

        expect(model).toBeTruthy();
        expect(model.membership_plan_rate.constructor).toBe(MembershipPlanRate);
    });
});
