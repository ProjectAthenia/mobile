import {Injectable} from '@angular/core';
import {RequestsProvider} from '../providers/requests/requests';
import {User} from '../models/user/user';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService
{
    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider)
    {}

    /**
     * Tells us whether or not the passed in feature id can be access by the logged in user
     */
    public hasFeatureAccess(user: User, featureId: number): Promise<boolean>
    {
        const currentSubscription = user.getCurrentSubscription();

        if (currentSubscription) {
            const currentMembershipPlan = currentSubscription.membership_plan_rate.membership_plan;
            return Promise.resolve(currentMembershipPlan.containsFeatureId(featureId))
        }

        return this.requests.subscriptions.fetchMembershipPlans().then(membershipPlans => {
            const defaultMembershipPlan = membershipPlans.find(membershipPlan => membershipPlan.default);

            return Promise.resolve(
                defaultMembershipPlan ? defaultMembershipPlan.containsFeatureId(featureId) : false
            );
        })
    }
}
