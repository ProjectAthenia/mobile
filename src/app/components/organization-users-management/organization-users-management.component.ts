import { Component, Input } from '@angular/core';
import { RequestsProvider } from '../../providers/requests/requests';
import {Organization} from '../../models/organization/organization';
import {OrganizationManager} from '../../models/organization/organization-manager';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-organization-users-management',
    templateUrl: './organization-users-management.component.html',
    styleUrls: ['./organization-users-management.component.scss']
})
export class OrganizationUsersManagementComponent {

    @Input()
    organization: Organization;

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
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: (value) => {
                        this.requests.organization.createOrganizationManager(this.organization.id, value[0]).then((organizationManager) => {
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
