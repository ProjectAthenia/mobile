import {Organization} from './organization';
import {BaseModel} from '../base-model';
import {Relation} from '../relation';
import {User} from '../user/user';

/**
 * Used as a data wrapper for our organization manager model
 */
export class OrganizationManager extends BaseModel {

    /**
     * The human readable identifier of this payment method
     */
    role_id: number;

    /**
     * The id of the organization this manager is apart of
     */
    organization_id: number;

    /**
     * The organization model
     */
    organization: Organization;

    /**
     * THe user this is linked to
     */
    user: User;

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization: new Relation('model', Organization),
            user: new Relation('model', User),
        });
    }
}
