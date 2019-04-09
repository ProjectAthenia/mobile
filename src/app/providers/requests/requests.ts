import {RequestHandlerProvider} from '../request-handler/request-handler';
import Auth from './auth/auth';
import {Injectable} from '@angular/core';

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
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
        this.auth = new Auth(requestHandler);
    }
}
