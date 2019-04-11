import {BaseModel} from '../base-model';
import {MembershipPlan} from './membership-plan';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our membership plan rate model
 */
export class MembershipPlanRate extends BaseModel {

    /**
     * The cost of the membership plan
     */
    cost: number;

    /**
     * Whether or not this rate is currently active
     */
    active: boolean;

    /**
     * The membership plan model
     */
    membership_plan: MembershipPlan;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            membership_plan: new Relation('model', MembershipPlan),
        })
    }
}