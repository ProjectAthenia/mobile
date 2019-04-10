import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {ActivatedRoute} from '@angular/router';
import {RequestsProvider} from '../../providers/requests/requests';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';

@Component({
    selector: 'app-profile-editor',
    templateUrl: './profile-editor.page.html',
    styleUrls: ['./profile-editor.page.scss'],
})
export class ProfileEditorPage extends BasePage implements OnInit {

    /**
     * The form object that helps us validate the sign in form
     */
    form: FormGroup;

    /**
     * The form object that helps us validate the sign in form
     */
    user: User;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * Default Constructor
     * @param formBuilder
     * @param navController
     * @param requests
     * @param alertController
     * @param route
     * @param toastController
     */
    constructor(private formBuilder: FormBuilder,
                private navController: NavController,
                private requests: RequestsProvider,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private toastController: ToastController
    ) {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.form = this.formBuilder.group({

            name: ['', Validators.compose([
                Validators.maxLength(120),
            ])],
            password: ['',  Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(256),
            ])],
        });

        this.requests.auth.loadInitialInformation().then(user => {
            this.user = user;
            this.form.controls['name'].setValue(this.user.name);
        });
    }

    /**
     * Validates the save properly
     */
    save() {

        this.submitted = true;

        if (this.form.valid) {

            const data: any = {};

            if (this.form.controls['name'].dirty) {
                data.name = this.form.controls['name'].value;
            }
            if (this.form.controls['password'].dirty) {
                data.password = this.form.controls['password'].value;
            }

            this.requests.auth.updateUser(this.user, data).then(user => {

                this.user = user;
                this.form.controls['password'].setValue('');
                this.toastController.create({
                    message: 'Saved Successfully',
                }).then(toast => {
                    toast.present();
                })

            }).catch(console.error);
        }
    }
}
