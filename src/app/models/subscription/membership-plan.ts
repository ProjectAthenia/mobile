import {BaseModel} from '../base-model';

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
}