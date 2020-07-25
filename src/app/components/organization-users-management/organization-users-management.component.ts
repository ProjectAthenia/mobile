import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { RequestsProvider } from '../../providers/requests/requests';
import {Organization} from '../../models/organization/organization';
import {OrganizationManager} from '../../models/organization/organization-manager';
import {AlertController} from '@ionic/angular';
import Role from '../../models/user/role';

@Component({
    selector: 'app-organization-users-management',
    templateUrl: './organization-users-management.component.html',
    styleUrls: ['./organization-users-management.component.scss']
})
export class OrganizationUsersManagementComponent implements OnChanges {

    @Input()
    organization: Organization;

    /**
     * Whether or not the managers load has been kicked off
     */
    managersLoaded = false;

    /**
     * The organization managers for this organization
     */
    organizationManagers: OrganizationManager[];

    /**
     * Default Constructor
     * @param requests
     * @param alertController
     */
    constructor(private requests: RequestsProvider,
                private alertController: AlertController) {
    }

    /**
     * loads the managers when we are all set
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this.managersLoaded && this.organization) {
            this.managersLoaded = true;
            this.loadManagerPage(1);
        }
    }

    /**
     * Loads a page of managers off of the server
     * @param pageNumber
     */
    loadManagerPage(pageNumber) {
        this.requests.organization.loadOrganizationManagers(this.organization, pageNumber).then(page => {
            this.organizationManagers.concat(page.data);
            if (page.last_page > pageNumber) {
                this.loadManagerPage(pageNumber + 1);
            }
        });
    }

    /**
     * Makes sure the user wants to delete the organization manager
     * @param organizationManager
     */
    promptDeletion(organizationManager: OrganizationManager) {
        let alert;
        this.alertController.create({
            header: 'Are you sure?',
            message: 'This user will no longer be able to access any parts of your organization.',
            buttons: [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.requests.organization.deleteOrganizationManager(organizationManager).then(() => {
                            alert.dismiss();
                            this.organization.organization_managers =
                                this.organization.organization_managers.filter(i => i.id != organizationManager.id);
                        });
                    }
                }
            ]
        }).then(a => {
            alert = a;
            alert.present();
        });
    }

    editOrganizationManager(organizationManager: OrganizationManager) {

    }

    /**
     * Opens the add member prompt
     */
    addMember() {
        this.alertController.create({
            header: 'Add Member',
            message: 'Enter the email address of the user that you want to add to your organization.',
            inputs: [
                {
                    type: 'email',
                    name: 'email',
                },
                {
                    type: 'radio',
                    name: 'role_id',
                    value: Role.ADMINISTRATOR,
                    label: 'Administrator'
                },
                {
                    type: 'radio',
                    name: 'role_id',
                    value: Role.MANAGER,
                    label: 'Manager'
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: (value) => {
                        this.requests.organization.createOrganizationManager(this.organization.id, value['email'], value['role_id']).then((organizationManager) => {
                            this.organizationManagers.push(organizationManager);
                        });
                    }
                }
            ],
        }).then(alert => {
            alert.present();
        });
    }
}
