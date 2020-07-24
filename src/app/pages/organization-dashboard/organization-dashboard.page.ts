import {Component, OnInit,} from '@angular/core';
import {BasePage} from '../base.page';
import {OrganizationService} from '../../services/organization.service';
import {Organization} from '../../models/organization/organization';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-organization-dashboard',
    templateUrl: './organization-dashboard.page.html',
    styleUrls: ['./organization-dashboard.page.scss']
})
export class OrganizationDashboardPage extends BasePage implements OnInit{

    /**
     * The organization
     */
    organization: Organization;

    /**
     * Default Constructor
     * @param organizationService
     * @param route
     */
    constructor(private organizationService: OrganizationService,
                private route: ActivatedRoute) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {
        const organizationId = parseInt(this.route.snapshot.paramMap.get('organization_id'), 0);
        this.organizationService.getOrganization(organizationId).then(organization => {
            this.organization = organization;
        });
    }
}
