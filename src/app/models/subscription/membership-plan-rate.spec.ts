import {MembershipPlan} from './membership-plan';
import {MembershipPlanRate} from './membership-plan-rate';

describe('Test Membership Plan Rate Model', () => {

    it('Make sure that the membership plan rate model is being built properly', () => {
        const model = new MembershipPlanRate( {
            active: false,
            cost: 3.99,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the membership plan rate model is being built properly with a membership plan connected', () => {
        const model = new MembershipPlanRate( {
            active: false,
            cost: 3.99,
            membership_plan: {
                id: 4,
                name: 'A Plan',
                duration: 'yearly',
                current_cost: 9.99,
                current_rate_id: 21342
            }
        });

        expect(model).toBeTruthy();
        expect(model.membership_plan.constructor).toBe(MembershipPlan);
    });
});
