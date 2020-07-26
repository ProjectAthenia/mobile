import {Organization} from './organization';
import {BaseModel} from '../base-model';
import {Relation} from '../relation';
import {User} from '../user/user';
import Role from '../user/role';

/**
 * Used as a data wrapper for our organization manager model
 */
export class OrganizationManager extends BaseModel {

    /**
     * The human readable identifier of this payment method
     */
    role_id: number;

    /**
     * The id of the logged in user
     */
    user_id: number;

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

    /**
     * The name of this user that we want to display
     */
    name(): string {
        return this.user.name ? this.user.name : this.user.email;
    }

    /**
     * The descriptive role name for this organization manager
     */
    roleName(): string {
        switch (this.role_id) {
            case Role.MANAGER:
                return 'Manager';

            case Role.ADMINISTRATOR:
                return 'Administrator';

            default:
                return 'Unknown';
        }
    }
}
