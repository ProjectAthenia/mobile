import {Injectable} from '@angular/core';
import {RequestsProvider} from '../providers/requests/requests';
import {User} from '../models/user/user';
import {Feature} from '../models/feature';

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

    /**
     * Gets a feature based on the passed in id if it can be found
     * rejects the promise if we could not find the feature
     * @param featureId
     */
    public getFeature(featureId: number): Promise<Feature>
    {
        // Membership plans are more likely to be used
        return this.requests.subscriptions.fetchMembershipPlans().then(membershipPlans => {
            const maybeMembershipPlanWithFeature =
                membershipPlans.find(membershipPlan => membershipPlan.containsFeatureId(featureId));
            let maybeFeature = maybeMembershipPlanWithFeature ?
                maybeMembershipPlanWithFeature.features.find(feature => feature.id == featureId) : null;

            if (maybeFeature) {
                return Promise.resolve(maybeFeature);
            } else {
                // Now we check the features endpoint for the data directly
                return this.requests.features.fetchFeatures().then(features => {
                    maybeFeature = features.find(feature => feature.id == featureId);
                    if (maybeFeature) {
                        return Promise.resolve(maybeFeature);
                    }

                    return Promise.reject('Feature not found');
                });
            }
        });
    }
}
