import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {MembershipPlan} from '../../../models/subscription/membership-plan';
import {User} from '../../../models/user/user';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Subscription} from '../../../models/subscription/subscription';

/**
 * All requests needed for handling subscriptions within the app
 */
export default class Subscriptions {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Fetches all membership plans
     */
    async fetchMembershipPlans(): Promise<MembershipPlan[]> {
        return this.requestHandler
            .get('membership-plans', true, true, [
                'features',
            ])
            .then(response => {
                const data = response.data;
                const membershipPlans = [];
                data.forEach(entry => {
                    membershipPlans.push(new MembershipPlan(entry));
                });
                return Promise.resolve(membershipPlans);
            }
        );
    }

    /**
     * Creates a subscription properly
     * @param user
     * @param paymentMethod
     * @param membershipPlan
     */
    async createSubscription(user: User, paymentMethod: PaymentMethod, membershipPlan: MembershipPlan): Promise<Subscription> {
        const data = {
            recurring: true,
            membership_plan_rate_id: membershipPlan.current_rate_id,
            payment_method_id: paymentMethod.id,
        };
        return this.requestHandler
            .post('users/' + user.id + '/subscriptions', true, true, data)
            .then(response => {
                return Promise.resolve(new Subscription(response));
            }
        );
    }

    /**
     * Creates a subscription properly
     * @param user
     * @param subscription
     * @param data
     */
    async updateSubscription(user: User, subscription: Subscription, data: any): Promise<Subscription> {
        return this.requestHandler
            .put('users/' + user.id + '/subscriptions/' + subscription.id, true, true, data)
            .then(response => {
                    return Promise.resolve(new Subscription(response));
                }
            );
    }
}
