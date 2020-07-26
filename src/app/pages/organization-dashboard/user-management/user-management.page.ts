import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../base.page';
import {Organization} from '../../../models/organization/organization';
import {OrganizationService} from '../../../services/organization.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.page.html',
    styleUrls: ['./user-management.page.scss']
})
export class UserManagementPage extends BasePage implements OnInit{

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
