import { Injectable } from '@angular/core';
import {Organization} from '../models/organization/organization';
import {RequestsProvider} from '../providers/requests/requests';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    /**
     * All loaded users in the system
     */
    loadedOrganizations: any = {};

    /**
     * The contacts that have been loaded
     */
    organizations: Organization[] = [];

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider) {
    }

    /**
     * Sets an organization object into cache
     * @param organization
     */
    cacheOrganization(organization: Organization) {
        this.loadedOrganizations[organization.id] = organization;
    }

    /**
     * Gets an organization by an id
     * @param id
     */
    getOrganization(id: number): Promise<Organization> {
        if (this.loadedOrganizations[id]) {
            return Promise.resolve(this.loadedOrganizations[id]);
        }

        return this.requests.organization.loadOrganization(id).then(organization => {
            this.cacheOrganization(organization);
            return Promise.resolve(organization);
        })
    }
}
