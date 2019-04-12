import {BaseModel} from '../base-model';
import {MembershipPlanRate} from './membership-plan-rate';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our subscription model
 */
export class Subscription extends BaseModel {

    /**
     * The payment method id for the subscription
     */
    payment_method_id: number;

    /**
     * The last date the subscription renewed
     */
    last_renewed_at: Date;

    /**
     * The date the subscription was initially set up
     */
    subscribed_at: Date;

    /**
     * The date the subscription expires
     */
    expires_at: Date;

    /**
     * The date when this subscription was canceled
     */
    canceled_at: Date;

    /**
     * The duration for the membership plan
     */
    recurring: boolean;

    /**
     * The membership plan rate
     */
    membership_plan_rate: MembershipPlanRate;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            membership_plan_rate: new Relation('model', MembershipPlanRate),
        }, [
            'last_renewed_at',
            'subscribed_at',
            'expires_at',
            'canceled_at',
        ]);
    }
}