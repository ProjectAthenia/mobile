import {BaseModel} from '../base-model';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our payment method model
 */
export class PaymentMethod extends BaseModel {

    /**
     * The human readable identifier of this payment method
     */
    identifier: string;
}