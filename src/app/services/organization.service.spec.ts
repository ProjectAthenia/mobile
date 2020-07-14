import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';
import {Organization} from '../models/organization/organization';

describe('OrganizationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OrganizationService = TestBed.get(OrganizationService);
        expect(service).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: OrganizationService = TestBed.get(OrganizationService);
        service.cacheOrganization(new Organization({
            id: 45252,
        }));
        expect(service.loadedOrganizations[45252]).toBeTruthy();
    });

    it('should return null when a user is not found', () => {
        const service: OrganizationService = TestBed.get(OrganizationService);

        const result = service.getOrganization(45252);
        expect(result).toBeNull();
    });

    it('should get a user properly', () => {
        const service: OrganizationService = TestBed.get(OrganizationService);

        const user = new Organization({
            id: 45252,
        });
        service.cacheOrganization(user);

        const result = service.getOrganization(45252);
        expect(user).toBe(result);
    });
});
