import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {User} from '../../../models/user/user';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Asset} from '../../../models/asset';

/**
 * All requests needed for handling authentication within the app
 */
export default class Auth {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Runs the sign in request
     *
     * @param email
     * @param password
     * @param invalidCredentialsHandler
     */
    async signIn(email: string, password: string, invalidCredentialsHandler: (error) => void): Promise<any> {
        const data = {
            email: email,
            password: password,
        };

        return this.requestHandler.post('auth/login', false, true, data, {
            401 : invalidCredentialsHandler
        });
    }

    /**
     * Runs the sign in request
     *
     * @param userData
     * @param emailInUseHandler
     */
    async signUp(userData: any, emailInUseHandler: (error) => void): Promise<any> {
        return this.requestHandler.post('auth/sign-up', false, true, userData, {
            400 : emailInUseHandler
        });
    }

    /**
     * Runs the request to load initial information needed during the auth flow
     */
    async loadInitialInformation(): Promise<User> {
        return this.requestHandler
            .get('users/me', true, true, [
                'organizationManagers',
                'organizationManagers.organization',
                'paymentMethods',
                'subscriptions',
                'subscriptions.membershipPlanRate',
                'subscriptions.membershipPlanRate.membershipPlan',
                'subscriptions.membershipPlanRate.membershipPlan.features',
                // Add any expands needed here
            ]).then((response) => {
                    const user = new User(response);
                    return new Promise<User> (resolve => {
                        resolve(user);
                    });
                }
            );
    }

    /**
     * Runs an update for the user
     *
     * @param user
     * @param userData
     */
    async updateUser(user: User, userData: any): Promise<User> {
        return this.requestHandler.put('users/' + user.id, true, true, userData)
            .then((response) => {
                const userResponse = new User(response);
                return new Promise<User> (resolve => {
                        resolve(userResponse);
                    }
                );
            });
    }
}
