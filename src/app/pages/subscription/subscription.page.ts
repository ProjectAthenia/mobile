import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {ActivatedRoute} from '@angular/router';
import {RequestsProvider} from '../../providers/requests/requests';
import {FormBuilder} from '@angular/forms';
import {BasePage} from '../base.page';
import {Stripe} from '@ionic-native/stripe/ngx';
import {environment} from '../../../environments/environment';

declare function require(name:string);
require('card');

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage extends BasePage implements OnInit {

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
     * @param requests
     * @param alertController
     * @param route
     * @param toastController
     * @param stripe
     */
    constructor(private requests: RequestsProvider,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private toastController: ToastController,
                private stripe: Stripe,
    ) {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.stripe.setPublishableKey(environment.stripe_publishable_key).catch(console.error);

        this.requests.auth.loadInitialInformation().then(user => {
            this.user = user;
        });
    }

    /**
     * Validates the save properly
     */
    submit() {

        this.submitted = true;

    }
}
