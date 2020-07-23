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
                        alert.dismiss();
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
                        console.log(value);

                    }
                }
            ],
        })
    }
}
