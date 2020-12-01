import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, Platform, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {ActivatedRoute} from '@angular/router';
import {RequestsProvider} from '../../providers/requests/requests';
import {BasePage} from '../base.page';
import {Stripe, StripeCardTokenParams} from '@ionic-native/stripe/ngx';
import {environment} from '../../../environments/environment';
import {MembershipPlan} from '../../models/subscription/membership-plan';
import {PaymentMethod} from '../../models/payment/payment-method';
import {Subscription} from '../../models/subscription/subscription';
import DateHelpers from '../../providers/date-helpers/date-helpers';
import {UserService} from '../../services/user.service';
import {SubscriptionService} from '../../services/subscription.service';
import {Feature} from '../../models/feature';

declare function require(name:string);
require('card');

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage extends BasePage implements OnInit
{
    /**
     * The available membership plans
     */
    membershipPlans: MembershipPlan[];

    /**
     * The form object that helps us validate the sign in form
     */
    user: User;

    /**
     * The current subscription if there is one
     */
    currentSubscription: Subscription = null;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * Any general errors with the process
     */
    error: string = null;

    /**
     * Any card errors
     */
    cardError: string = null;

    /**
     * The payment method the user has selected. False if none, null if new.
     */
    selectedPaymentMethod: PaymentMethod|boolean = false;

    /**
     * The selected membership plan if one has been selected
     */
    selectedMembershipPlan: MembershipPlan = null;

    /**
     * The feature id the user is trying to get access to
     */
    feature: Feature = null;

    /**
     * The card number input
     */
    @ViewChild('cardNumber', {static: false}) cardNumber: ElementRef;

    /**
     * The card name input
     */
    @ViewChild('cardName', {static: false}) cardName: ElementRef;

    /**
     * The card expiry input
     */
    @ViewChild('cardExpiry', {static: false}) cardExpiry: ElementRef;

    /**
     * The card CVC input
     */
    @ViewChild('cardCVC', {static: false}) cardCVC: ElementRef;

    /**
     * Default Constructor
     * @param platform
     * @param requests
     * @param alertController
     * @param userService
     * @param route
     * @param toastController
     * @param stripe
     * @param subscriptionService
     */
    constructor(private platform: Platform,
                private requests: RequestsProvider,
                private alertController: AlertController,
                private userService: UserService,
                private route: ActivatedRoute,
                private toastController: ToastController,
                private stripe: Stripe,
                private subscriptionService: SubscriptionService)
    {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit()
    {
        this.platform.ready().then(() => {
            this.stripe.setPublishableKey(environment.stripe_publishable_key).catch(console.error);
            this.getUserDataReady();
        });
    }

    /**
     * Loads our user fresh from the server, and then figures out their current subscription status
     */
    private getUserDataReady()
    {
        this.requests.auth.loadInitialInformation().then(user => {
            this.user = user;
            this.userService.storeMe(user);
            this.currentSubscription = this.user.getCurrentSubscription();
            if (this.currentSubscription) {
                this.selectedPaymentMethod = this.user.payment_methods.find(paymentMethod => {
                    return paymentMethod.id == this.currentSubscription.payment_method_id;
                });
            }
            if (this.user.payment_methods.length == 0) {
                this.selectedPaymentMethod = null;
            }
            this.getSubscriptionDataReady();
        }).catch(console.error);
    }

    /**
     * Gets everything ready after we have the user loaded
     */
    private getSubscriptionDataReady()
    {
        this.requests.subscriptions.fetchMembershipPlans().then(membershipPlans => {

            const maybeFeatureId = this.route.snapshot.paramMap.get('feature_id');

            if (maybeFeatureId) {
                this.findFeature(parseInt(maybeFeatureId), membershipPlans);
            } else {
                this.setAvailableMembershipMembershipPlans(membershipPlans);
            }
        }).catch(console.error);
    }

    /**
     * gets everything ready for when the user wants to access a feature
     */
    findFeature(featureId: number, membershipPlans: MembershipPlan[])
    {
        this.subscriptionService.getFeature(featureId).then(feature => {
            this.feature = feature;
            this.setAvailableMembershipMembershipPlans(
                membershipPlans.filter(membershipPlan => membershipPlan.containsFeatureId(featureId))
            );
        }).catch(() => {
            // TODO handle feature not available error
        });
    }

    /**
     * Sets all membership plans that are currently available based on the current page state
     * @param membershipPlans
     */
    setAvailableMembershipMembershipPlans(membershipPlans: MembershipPlan[])
    {
        this.membershipPlans = this.currentSubscription ? membershipPlans.filter(membershipPlan => {
            return membershipPlan.current_cost > this.currentSubscription.membership_plan_rate.cost;
        }) : membershipPlans;
        if (this.membershipPlans.length == 1) {
            this.setSelectedMembershipPlan(this.membershipPlans[0]);
        }
    }

    /**
     * All active membership plans
     */
    activeMembershipPlans(): MembershipPlan[]
    {
        return this.membershipPlans;
    }

    /**
     * Gets the display style for the card selector
     */
    getCardSelectorDisplay()
    {
        return {
            display: !this.currentSubscription ||
            (this.currentSubscription.expires_at && this.currentSubscription.recurring) ? 'block' : 'none',
        };
    }

    /**
     * Gets the new card input display
     */
    getCardDisplay()
    {
        return {
            display: this.selectedPaymentMethod === null ? 'flex' : 'none',
        };
    }

    /**
     * Gets the user's current subscription status
     */
    getCurrentSubscriptionStatus(): string
    {
        if (!this.currentSubscription.expires_at) {
            return 'good for a lifetime!';
        } else {
            const now = new Date();
            let formattedExpiration = DateHelpers.suffixDay(this.currentSubscription.expires_at.getDate());
            if (this.currentSubscription.expires_at.getMonth() != now.getMonth() || this.currentSubscription.expires_at.getFullYear() !== now.getFullYear()) {
                formattedExpiration+= ' of ' + DateHelpers.getMonthName(this.currentSubscription.expires_at);
            }
            if (this.currentSubscription.expires_at.getFullYear() !== now.getFullYear()) {
                formattedExpiration+= ' ' + this.currentSubscription.expires_at.getFullYear();
            }
            if (this.currentSubscription.recurring) {
                return 'set to be auto-renewed on the ' + formattedExpiration + '.';
            } else {
                return 'set to expire on the ' + formattedExpiration + '.';
            }
        }
    }

    /**
     * Sets the subscription to be recurring
     * @param recurring
     */
    setRecurring(recurring: boolean)
    {
        this.requests.subscriptions.updateSubscription(
            this.user,
            this.currentSubscription,
            {recurring: recurring}
        ).then(subscription => {
            this.currentSubscription.recurring = recurring;
        });
    }

    /**
     * Sets the current payment method the user has selected
     * @param paymentMethod
     */
    setSelectedPaymentMethod(paymentMethod: PaymentMethod)
    {
        this.selectedPaymentMethod = paymentMethod;
    }

    /**
     * Sets the selected membership plan properly
     * @param membershipPlan
     */
    setSelectedMembershipPlan(membershipPlan: MembershipPlan) {
        this.selectedMembershipPlan = membershipPlan;
    }

    /**
     * Validates the save properly
     */
    submit()
    {
        this.submitted = true;
        this.error = null;
        this.cardError = null;

        if (this.currentSubscription) {
            if (this.selectedPaymentMethod === null) {
                this.validateCard().then(card => {
                    this.stripe.createCardToken(card).then(token => {
                        this.requests.entityRequests.createPaymentMethod(this.user, token.id).then(paymentMethod => {
                            this.user.payment_methods.push(paymentMethod);
                            this.setSelectedPaymentMethod(paymentMethod);
                            this.changePaymentMethod(paymentMethod);
                        });
                    });
                });
            } else {
                this.changePaymentMethod(this.selectedPaymentMethod as PaymentMethod);
            }
        } else {
            if (!this.selectedMembershipPlan) {
                this.error = 'Please select a membership plan.';
            } else if (this.selectedPaymentMethod === false) {
                this.error = 'Please select a payment method.';
            } else if (this.selectedPaymentMethod === null) {
                this.validateCard().then(card => {

                    this.stripe.createCardToken(card).then(token => {
                        this.requests.entityRequests.createPaymentMethod(this.user, token.id).then(paymentMethod => {
                            this.selectedPaymentMethod = paymentMethod;
                            this.user.payment_methods.push(paymentMethod);
                            this.createSubscription();
                        });
                    }).catch(error => {
                        this.cardNumber = error.message;
                    });
                }).catch(error => {
                    this.cardError = error.message;
                });
            } else {
                this.createSubscription();
            }
        }
    }

    /**
     * Validates the card data properly
     */
    async validateCard(): Promise<StripeCardTokenParams>
    {
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

        await this.stripe.validateCardNumber(cardNumber).catch( () => {
            throw new Error('Invalid Credit Card Number');
        });
        await this.stripe.validateExpiryDate(explodedExpiration[0], explodedExpiration[1]).catch( () =>  {
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

    /**
     * creates a subscription properly
     */
    createSubscription()
    {
        const paymentMethod = this.selectedPaymentMethod;
        if (paymentMethod) {

            this.requests.subscriptions.createSubscription(
                this.user, paymentMethod as PaymentMethod,
                this.selectedMembershipPlan
            ).then(subscription => {
                this.currentSubscription = subscription;
                this.user.subscriptions.push(subscription);
                this.userService.storeMe(this.user);
                this.toastController.create({
                    message: 'Subscription successfully created!',
                    duration: 2000,
                }).then(toast => {
                    toast.present();
                });
            }).catch(() => {
                this.error = 'Error processing payment. Please try another payment source.';
            });
        }
    }

    /**
     * Changes the payment method properly
     * @param paymentMethod
     */
    changePaymentMethod(paymentMethod: PaymentMethod)
    {
        this.requests.subscriptions.updateSubscription(
            this.user,
            this.currentSubscription,
            {payment_method_id: paymentMethod.id}
        ).then(() => {
            this.currentSubscription.payment_method_id = paymentMethod.id;
        });
    }
}
