import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {Organization} from '../../../models/organization/organization';
import {OrganizationManager} from '../../../models/organization/organization-manager';
import {Page} from '../../../models/page';

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

        return this.requestHandler.post('organizations', true, true, data).then(data => {
            return Promise.resolve(new Organization(data));
        });
    }

    /**
     * Loads an organization based on the id passed in
     *
     * @param id
     */
    async loadOrganization(id: any): Promise<Organization> {
        return this.requestHandler.get('organizations/' + id, true, true, []).then(data => {
            return Promise.resolve(new Organization(data));
        });
    }

    /**
     * Creates an organization manager related to the email passed in
     * @param organizationId
     * @param email
     */
    async createOrganizationManager(organizationId: any, email: string): Promise<OrganizationManager> {
        return this.requestHandler.post('organizations/' + organizationId + '/organization-managers', true, true, {
            email: email,
        }).then(data => {
            return Promise.resolve(new OrganizationManager(data));
        });
    }

    /**
     * Delete the organization manager properly
     * @param organizationManager
     */
    async deleteOrganizationManager(organizationManager: OrganizationManager): Promise<any> {
        return this.requestHandler.delete('organizations/' + organizationManager.organization_id + '/organization-managers/' + organizationManager.id, true, true);
    }

    /**
     *
     * @param organization
     * @param pageNumber
     */
    async loadOrganizationManagers(organization: Organization, pageNumber: number): Promise<Page<OrganizationManager>> {
        return this.requestHandler.get('organizations/' + organization.id + '/organization-managers', true, true, [
            'user',
        ], null, null, null, 100, pageNumber).then(data => {
            return Promise.resolve(new Page(data, OrganizationManager));
        });
    }
}
