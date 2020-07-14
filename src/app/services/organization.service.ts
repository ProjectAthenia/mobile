import { Injectable } from '@angular/core';
import {Organization} from '../models/organization/organization';

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
    getOrganization(id: number): Organization | null {
        return this.loadedOrganizations[id] ? this.loadedOrganizations[id] : null;
    }
}
