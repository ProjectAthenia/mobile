import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { RequestsProvider } from '../../providers/requests/requests';
import {Organization} from '../../models/organization/organization';

@Component({
    selector: 'app-organization-users-management',
    templateUrl: './organization-users-management.component.html',
    styleUrls: ['./organization-users-management.component.scss']
})
export class OrganizationUsersManagementComponent {

    @Input()
    organization: Organization;

    /**
     * Default Constructor
     * @param requests
     */
    constructor(private requests: RequestsProvider)
    {}
}
