import {Organization} from './organization';
import {BaseModel} from '../base-model';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our organization manager model
 */
export class OrganizationManager extends BaseModel {

    /**
     * The human readable identifier of this payment method
     */
    role_id: number;

    /**
     * The organization model
     */
    organization: Organization;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization: new Relation('model', Organization)
        });
    }
}
