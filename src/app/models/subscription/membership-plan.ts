import {BaseModel} from '../base-model';
import {Feature} from '../feature';
import {Relation} from '../relation';
import {Subscription} from './subscription';
import {subscribeOn} from 'rxjs/operators';

/**
 * Used as a data wrapper for our membership plan model
 */
export class MembershipPlan extends BaseModel {

    /**
     * The name of the membership plan
     */
    name: string;

    /**
     * The duration for the membership plan
     */
    duration: string;

    /**
     * The current cost of the membership plan
     */
    current_cost: number;

    /**
     * The id of the current rate model
     */
    current_rate_id: number;

    /**
     * Whether or not this is the default membership plan in the system
     */
    default: boolean;

    /**
     * All features contained in this
     */
    features: Feature[];

    /**
     * Default constructor
     * @param data
     */
    constructor(data)
    {
        super(data, {
            features: new Relation('array', Feature),
        });
    }

    /**
     * Allows us to figure out whether or not this
     * @param featureId
     */
    containsFeatureId(featureId: number): boolean
    {
        return this.features.find(feature => feature.id == featureId) != null;
    }

    /**
     * Calculates how much a subscription to this wil lcost
     * @param currentSubscription
     */
    calculateProratedCost(currentSubscription: Subscription): number
    {
        const amountPaid = currentSubscription.membership_plan_rate.cost;
        if (this.duration == 'lifetime') {
            const date3MonthsAgo = new Date();
            date3MonthsAgo.setMonth(date3MonthsAgo.getMonth() - 3);
            return currentSubscription.subscribed_at < date3MonthsAgo ?
                this.current_cost : this.current_cost - amountPaid;
        }
        const oneDay = 24 * 60 * 60 * 1000;
        const today = new Date();
        const daysRemaining = Math.round((today as any - (currentSubscription.expires_at as any)) / oneDay);
        const dailyCostDiff = (this.current_cost - amountPaid) / 365;
        return daysRemaining > 0 && dailyCostDiff > 0 ? Math.round(daysRemaining * dailyCostDiff) : 0;
    }
}
