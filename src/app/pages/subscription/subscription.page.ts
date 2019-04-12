import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {ActivatedRoute} from '@angular/router';
import {RequestsProvider} from '../../providers/requests/requests';
import {BasePage} from '../base.page';
import {Stripe, StripeCardTokenParams} from '@ionic-native/stripe/ngx';
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
     * Any card errors
     */
    cardError: string = null;

    /**
     * The card number input
     */
    @ViewChild('cardNumber') cardNumber: ElementRef;

    /**
     * The card name input
     */
    @ViewChild('cardName') cardName: ElementRef;

    /**
     * The card expiry input
     */
    @ViewChild('cardExpiry') cardExpiry: ElementRef;

    /**
     * The card CVC input
     */
    @ViewChild('cardCVC') cardCVC: ElementRef;

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
        this.cardError = null;

        this.validateCard().then(card => {

            this.stripe.createCardToken(card).then(token => {
                console.log(token);
            }).catch(error => {
                this.cardNumber = error.message;
            });
        }).catch(error => {
            this.cardError = error.message;
        });
    }

    /**
     * Validates the card data properly
     */
    async validateCard() : Promise<StripeCardTokenParams> {

        const cardNumber = this.cardNumber.nativeElement.value;
        if (!cardNumber) {
            throw new Error('Please enter your credit card number.');
        }

        const cardName = this.cardName.nativeElement.value;
        if (!cardName) {
            throw new Error('Please enter the name on your credit card.');
        }

        const expiration = this.cardExpiry.nativeElement.value;
        if (!expiration) {
            throw new Error('Please enter the expiration date on your credit card.');
        }

        const cvc = this.cardCVC.nativeElement.value;
        if (!expiration) {
            throw new Error('Please enter the your credit card CVC.');
        }

        const explodedExpiration = expiration.split(' / ');
        if (explodedExpiration.length != 2) {
            throw new Error('Please enter a valid expiration date.');
        }
        console.log(explodedExpiration);

        await this.stripe.validateCardNumber(cardNumber).catch( () => {
            throw new Error('Invalid Credit Card Number');
        });
        await this.stripe.validateExpiryDate(explodedExpiration[0], explodedExpiration[1]).catch( error =>  {
            console.log(error);
            throw new Error('Invalid Expiration Date');
        });
        await this.stripe.validateCVC(cvc).catch( () => {
            throw new Error('Invalid CVC');
        });

        return Promise.resolve({
            number: cardNumber,
            name: cardName,
            expMonth: parseInt(explodedExpiration[0]),
            expYear: parseInt(explodedExpiration[1]),
            cvc: cvc
        });
    }
}
