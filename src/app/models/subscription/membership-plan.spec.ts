import {MembershipPlan} from './membership-plan';

describe('Test Membership Plan Model', () => {

    it('Make sure that the membership plan model is being built properly', () => {
        const model = new MembershipPlan({
            id: 4,
            name: 'A Plan',
            duration: 'yearly',
            current_cost: 9.99,
            current_rate_id: 21342
        });

        expect(model).toBeTruthy();
    });
});
