import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {regexValidators} from '../../validators/validators';
import {StorageProvider} from '../../providers/storage/storage';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {User} from "../../models/user/user";
import {UserService} from '../../services/user.service';
import {AppComponent} from '../../app.component';
import {BasePage} from '../base.page';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage implements OnInit {

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
     * @param storageProvider
     * @param requestsProvider
     * @param toastController
     * @param alertController
     * @param userService
     * @param navController
     */
    constructor(private formBuilder: FormBuilder,
                private storageProvider: StorageProvider,
                private requestsProvider: RequestsProvider,
                private toastController: ToastController,
                private alertController: AlertController,
                private userService: UserService,
                private navController: NavController,
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
                Validators.required,
            ])],
            email: ['', Validators.compose([
                Validators.pattern(regexValidators.email),
                Validators.maxLength(120),
                Validators.required,
            ])],
            password: ['',  Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(256),
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

            const data = {
                name: this.form.controls['name'].value,
                email: this.form.controls['email'].value,
                password: this.form.controls['password'].value,
            };
            this.requestsProvider.auth.signUp(data, this.handleExistingUser.bind(this))
                .then(this.handleLoginCompletion.bind(this));
        }
    }

    /**
     * Handles the login completion properly
     * @param response
     */
    handleLoginCompletion(response) {

        const authToken = response.token;

        this.storageProvider.saveAuthToken(authToken).catch( console.error);

        this.requestsProvider.auth.loadInitialInformation()
            .then(this.saveUserData.bind(this));
    }

    /**
     * Handles displaying the incorrect credentials toast to the user
     * @param error
     */
    handleExistingUser(error) {

        this.alertController.create({
            header: 'Hmm...',
            message: 'There already seems to be an account with this email address. Do you have an existing account?',
            buttons: [
                {
                    text: 'Nope',
                    role: 'cancel',
                },
                {
                    text: 'Login',
                    handler: this.goToSignIn.bind(this)
                },
            ]
        }).then(alert => {
            alert.present();
        });
    }

    /**
     * Takes the user to the login page
     */
    goToSignIn() {
        this.navController.navigateRoot('/sign-in').catch(console.error);
    }

    /**
     * Saves user information
     *
     * @param user
     */
    saveUserData(user: User) {
        this.userService.storeMe(user);
        this.storageProvider.saveLoggedInUserId(user.id)
        .then((result) => {
            AppComponent.LOGGED_IN = true;
            this.navController.navigateRoot('/home');
        }).catch(error => {
            this.toastController.create({
                message: 'Error saving user information.',
                duration: 4000,
                position: 'top'
            }).then(toast => {
                toast.present();
            });
        });
    }
}
