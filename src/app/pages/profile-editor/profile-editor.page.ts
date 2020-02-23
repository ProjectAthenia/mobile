import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
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
     * @param requests
     * @param toastController
     */
    constructor(private formBuilder: FormBuilder,
                private requests: RequestsProvider,
                private toastController: ToastController,
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
            about_me: [''],
            allow_users_to_add_me: [''],
            receive_push_notifications: [''],
            password: ['',  Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(256),
            ])],
        });

        this.requests.auth.loadInitialInformation().then(user => {
            this.user = user;
            this.form.controls['name'].setValue(this.user.name);
            this.form.controls['about_me'].setValue(this.user.about_me);
            this.form.controls['allow_users_to_add_me'].setValue(this.user.allow_users_to_add_me);
            this.form.controls['receive_push_notifications'].setValue(this.user.receive_push_notifications);
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
            if (this.form.controls['about_me'].dirty) {
                data.about_me = this.form.controls['about_me'].value;
            }
            if (this.form.controls['password'].dirty) {
                data.password = this.form.controls['password'].value;
            }
            if (this.form.controls['allow_users_to_add_me'].dirty) {
                data.allow_users_to_add_me = this.form.controls['allow_users_to_add_me'].value;
            }
            if (this.form.controls['receive_push_notifications'].dirty) {
                data.receive_push_notifications = this.form.controls['receive_push_notifications'].value;
            }

            this.requests.auth.updateUser(this.user, data).then(user => {

                this.user = user;
                this.form.controls['password'].setValue('');
                this.toastController.create({
                    message: 'Saved Successfully',
                    duration: 1000,
                }).then(toast => {
                    toast.present();
                })

            }).catch(console.error);
        }
    }
}
