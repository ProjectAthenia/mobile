import {BaseModel} from '../base-model';
import {Relation} from '../relation';
import {PaymentMethod} from '../payment/payment-method';

/**
 * Used as a data wrapper for our user model
 */
export class User extends BaseModel {

    /**
     * The name the user entered upon sign up
     */
    name: string;

    /**
     * The email address of the user
     */
    email: string;

    /**
     * All payment methods on this user
     */
    payment_methods: PaymentMethod[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            payment_methods: new Relation('array', PaymentMethod),
        })
    }
}
