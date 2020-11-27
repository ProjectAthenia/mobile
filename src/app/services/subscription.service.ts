import {Injectable} from '@angular/core';
import {RequestsProvider} from '../providers/requests/requests';
import {UserService} from './user.service';
import {MembershipPlan} from '../models/subscription/membership-plan';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService
{
    /**
     * Default Constructor
     * @param requests
     * @param userService
     */
    constructor(private requests: RequestsProvider,
                private userService: UserService) {
    }

    /**
     * Tells us whether or not the passed in feature id can be access by the logged in user
     */
    public hasFeatureAccess(featureId: number): Promise<boolean>
    {
    }

    /**
     * Gets all available membership plans in the system right now
     */
    public getAvailableMembershipPlan(): Promise<MembershipPlan[]>
    {
    }

    /**
     * Tells us whether or not the default membership plan contains the passed in feature id
     * @param featureId
     */
    private doesDefaultMembershipPlanContainFeature(featureId: number): Promise<boolean>
    {
    }
}
