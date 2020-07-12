import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Organization} from '../../../models/organization/organization';

/**
 * All requests needed for handling authentication within the app
 */
export default class OrganizationRequests {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Runs the sign in request
     *
     * @param name
     */
    async createOrganization(name: string): Promise<Organization> {
        const data = {
            name: name,
        };

        return this.requestHandler.post('organizations', false, true, data).then(data => {
            return Promise.resolve(new Organization(data));
        });
    }
}
