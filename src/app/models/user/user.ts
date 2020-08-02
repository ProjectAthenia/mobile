import {BaseModel} from '../base-model';
import {Relation} from '../relation';
import {PaymentMethod} from '../payment/payment-method';
import {Subscription} from '../subscription/subscription';
import {OrganizationManager} from '../organization/organization-manager';
import IsEntity from '../contracts/is-entity';

/**
 * Used as a data wrapper for our user model
 */
export class User extends BaseModel implements IsEntity {

    /**
     * The name the user entered upon sign up
     */
    name: string;

    /**
     * The email address of the user
     */
    email: string;

    /**
     * Information the user has entered about them self
     */
    about_me: string;

    /**
     * The url to this users profile image
     */
    profile_image_url: string;

    /**
     * Whether or not this user allows other users to add them
     */
    allow_users_to_add_me: boolean;

    /**
     * Whether or not this user wants to receive push notifications
     */
    receive_push_notifications: boolean;

    /**
     * All organization managers on this user
     */
    organization_managers: OrganizationManager[];

    /**
     * All payment methods on this user
     */
    payment_methods: PaymentMethod[];

    /**
     * All payment methods on this user
     */
    subscriptions: Subscription[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization_managers: new Relation('array', OrganizationManager),
            payment_methods: new Relation('array', PaymentMethod),
            subscriptions: new Relation('array', Subscription),
        });
    }

    /**
     * The base api route
     */
    baseRoute(): string {
        return 'users';
    }

    /**
     * Gets all currently active subscriptions for a user
     */
    getActiveSubscriptions(): Subscription[] {
        return this.subscriptions.filter(subscription => {
            return subscription.expires_at == null || subscription.expires_at > new Date();
        });
    }

    /**
     * Gets the users current subscription if there is one
     */
    getCurrentSubscription(): Subscription {
        const activeSubscriptions = this.getActiveSubscriptions();
        const sortedSubscriptions = activeSubscriptions.sort((subscriptionA, subscriptionB) => {
            if (!subscriptionA.expires_at) {
                return -1;
            }
            if (!subscriptionB.expires_at) {
                return 1;
            }
            return subscriptionA.expires_at.getTime() - subscriptionB.expires_at.getTime();
        });

        return sortedSubscriptions.length ? sortedSubscriptions[0] : null;
    }
}
