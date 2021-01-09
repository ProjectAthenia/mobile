import {RequestHandlerProvider} from '../request-handler/request-handler';
import Auth from './auth/auth';
import {Injectable} from '@angular/core';
import Subscriptions from './subscriptions/subscriptions';
import Social from './social/social';
import Messaging from './messaging/messaging';
import OrganizationRequests from './organization/organization';
import EntityRequests from './entity/entity';
import Features from './features/features';

/**
 * Provider for interacting with all app wide requests
 */
@Injectable()
export class RequestsProvider
{
    /**
     * The auth requests available
     */
    auth: Auth;

    /**
     * All features requests
     */
    features: Features;

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
     * The organization requests
     */
    organization: OrganizationRequests;

    /**
     * All requests related to the entity
     */
    entityRequests: EntityRequests;

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider)
    {
        this.auth = new Auth(requestHandler);
        this.features = new Features(requestHandler);
        this.subscriptions = new Subscriptions(this.requestHandler);
        this.social = new Social(this.requestHandler);
        this.messaging = new Messaging(requestHandler);
        this.organization = new OrganizationRequests(this.requestHandler);
        this.entityRequests = new EntityRequests(this.requestHandler);
    }
}
