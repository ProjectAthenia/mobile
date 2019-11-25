import {RequestHandlerProvider} from '../request-handler/request-handler';
import Auth from './auth/auth';
import {Injectable} from '@angular/core';
import Subscriptions from './subscriptions/subscriptions';
import Social from './social/social';
import Messaging from './messaging/messaging';

/**
 * Provider for interacting with all app wide requests
 */
@Injectable()
export class RequestsProvider {

    /**
     * The auth requests available
     */
    auth: Auth;

    /**
     * The requests related to our subscriptions
     */
    subscriptions: Subscriptions;

    /**
     * The social media requests available
     */
    social: Social;

    /**
     * The messaging requests available
     */
    messaging: Messaging;

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
        this.auth = new Auth(requestHandler);
        this.subscriptions = new Subscriptions(this.requestHandler);
        this.social = new Social(this.requestHandler);
        this.messaging = new Messaging(requestHandler);
    }
}
