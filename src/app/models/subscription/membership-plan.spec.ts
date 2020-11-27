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

    it('Make sure the containsFeatureId function is responding properly', () => {
        const model = new MembershipPlan({
            features: [
                {
                    id: 3214,
                },
                {
                    id: 325,
                },
            ],
        });

        expect(model.containsFeatureId(234)).toBeFalsy();
        expect(model.containsFeatureId(325)).toBeTruthy();
    })
});
