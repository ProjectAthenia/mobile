import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {RequestsProvider} from '../../providers/requests/requests';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
     * @param alertController
     * @param camera
     */
    constructor(private formBuilder: FormBuilder,
                private requests: RequestsProvider,
                private toastController: ToastController,
                private alertController: AlertController,
                private camera: Camera,
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
     * Returns the profile image style object for the associated user
     */
    profileImageStyle() {
        return this.user && this.user.profile_image_url ? {
            backgroundImage: 'url(' + this.user.profile_image_url + ')',
        } : {};
    }

    /**
     * Asks the user how they want to capture their profile image
     */
    promptCaptureMethod() {
        this.alertController.create({
            header: 'Do you want to take a picture, or select one from your library?',
            buttons: [
                {
                    text: 'Take',
                    handler: () => {
                        this.captureProfileImage(this.camera.PictureSourceType.CAMERA);
                    },
                }, {
                    text: 'Library',
                    handler: () => {
                        this.captureProfileImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                    },
                }
            ]
        }).then(alert => {
            alert.present();
        });
    }

    /**
     * Inits the image capture
     */
    captureProfileImage(sourceType) {
        const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(options).then((imageData) => {
            this.requests.auth.uploadProfileImage(this.user, imageData).then(asset => {
                this.user.profile_image_url = asset.url;
            });
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
