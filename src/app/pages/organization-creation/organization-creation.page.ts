import {Component, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';
import {RequestsProvider} from '../../providers/requests/requests';
import {OrganizationService} from '../../services/organization.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-organization-creation',
    templateUrl: './organization-creation.page.html',
    styleUrls: ['./organization-creation.page.scss']
})
export class OrganizationCreationPage extends BasePage implements OnInit{

    /**
     * The form object that helps us validate the sign in form
     */
    form: FormGroup;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * Default Constructor
     * @param formBuilder
     * @param requestsProvider
     * @param organizationService
     * @param navController
     */
    constructor(private formBuilder: FormBuilder,
                private requestsProvider: RequestsProvider,
                private organizationService: OrganizationService,
                private navController: NavController) {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {

        this.form = this.formBuilder.group({

            name: ['', Validators.compose([
                Validators.maxLength(120),
                Validators.required,
            ])],
        });
    }

    /**
     * Runs the submission to the server
     */
    submit () {
        this.submitted = true;

        if (this.form.valid) {

            const name = this.form.controls['name'].value;

            this.requestsProvider.organization.createOrganization(name).then(organization => {
                this.organizationService.cacheOrganization(organization);
                this.navController.navigateRoot('/organization-dashboard/' + organization.id).catch(console.error);
            });
        }
    }
}
