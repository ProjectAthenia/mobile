import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import Subscriptions from './subscriptions';
import {MembershipPlan} from '../../../models/subscription/membership-plan';
import {User} from '../../../models/user/user';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Subscription} from '../../../models/subscription/subscription';

describe('Test the subscription requests', () => {
    let requestHandler : RequestHandlerProvider;
    let subscriptions : Subscriptions;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        subscriptions = new Subscriptions(requestHandler);
    });

    it('Creates a request for fetching membership plans properly', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [
                {
                    id: 14,
                    name: 'Membership Plan 1',
                },
                {
                    id: 12,
                    name: 'Membership Plan 2',
                },
            ],
        }));
        const result = await subscriptions.fetchMembershipPlans();
        expect(result[0].constructor).toBe(MembershipPlan);
        expect(result[1].constructor).toBe(MembershipPlan);
    });

    it("Creates a create subscription request properly", async () => {
        const user = new User({
            id: 324,
        });
        const membershipPlan = new MembershipPlan({
            current_rate_id: 534,
        });
        const paymentMethod = new PaymentMethod({
            id: 76,
        });

        spyOn(requestHandler, "post").and.returnValue(Promise.resolve({
            id: 23543,
            user_id: 324,
            membership_plan_rate_id: 534,
            payment_method_id: 76,
        }));
        const result = await subscriptions.createSubscription(user, paymentMethod, membershipPlan);
        expect(requestHandler.post).toHaveBeenCalledWith(
            "users/324/subscriptions",
            true,
            true,
            {
                recurring: true,
                membership_plan_rate_id: membershipPlan.current_rate_id,
                payment_method_id: paymentMethod.id,
            },
        );

        expect(result.constructor).toBe(Subscription);
    });

    it("Creates an update subscription request properly", async () => {
        const user = new User({
            id: 324,
        });
        const subscription = new Subscription({
            id: 76,
            recurring: false,
        });

        spyOn(requestHandler, "put").and.returnValue(Promise.resolve({
            id: 76,
            user_id: 324,
            membership_plan_rate_id: 534,
            payment_method_id: 76,
        }));
        const result = await subscriptions.updateSubscription(user, subscription, {recurring: true});
        expect(requestHandler.put).toHaveBeenCalledWith(
            "users/324/subscriptions/76",
            true,
            true,
            {
                recurring: true,
            },
        );

        expect(result.constructor).toBe(Subscription);
    });
});