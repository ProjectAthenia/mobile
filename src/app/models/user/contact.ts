import {BaseModel} from '../base-model';
import {User} from './user';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our contact model
 */
export class Contact extends BaseModel {

    /**
     * The user id of the user that initiated this contact request
     */
    initiated_by_id: number;

    /**
     * The user id of the user that was request in this contact
     */
    requested_id: number;

    /**
     * The user that initiated this request
     */
    initiated_by: User;

    /**
     * The user requested
     */
    requested: User;

    /**
     * The confirmed at date, or null if not confirmed yet
     */
    confirmed_at: Date;

    /**
     * The denied at date, or null if not denied yet
     */
    denied_at: Date;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            initiated_by: new Relation('model', User),
            requested: new Relation('model', User),
        }, [
            'confirmed_at',
            'denied_at',
        ]);
    }
}