import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';
import {Organization} from '../models/organization/organization';
import RequestsProviderMock from '../providers/requests/requests.mock';

describe('OrganizationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OrganizationService = new OrganizationService(new RequestsProviderMock());
        expect(service).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: OrganizationService = new OrganizationService(new RequestsProviderMock());
        service.cacheOrganization(new Organization({
            id: 45252,
        }));
        expect(service.loadedOrganizations[45252]).toBeTruthy();
    });

    it('should get a organization from cache', async () => {
        const service: OrganizationService = new OrganizationService(new RequestsProviderMock());

        const organization = new Organization({
            id: 45252,
        });
        service.cacheOrganization(organization);

        const result = await service.getOrganization(45252);
        expect(organization).toBe(result);
    });

    it('should get the organization off the server if not found in cache', async () => {
        const requestsProvider = new RequestsProviderMock();
        const service: OrganizationService = new OrganizationService(requestsProvider);

        const organization = new Organization({
            id: 45252,
        });
        spyOn(requestsProvider.organization, 'loadOrganization').and.returnValue(Promise.resolve(organization));

        const result = await service.getOrganization(45252);
        expect(organization).toBe(result);
    });
});
