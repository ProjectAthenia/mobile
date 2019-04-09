import {RequestsProvider} from './requests';
import RequestHandlerProviderMock from '../request-handler/request-handler.mock';
import Auth from './auth/auth';

describe('Test the requests provider', () => {
    it('Make sure that the requests are built properly', () => {
        const requestsProvider = new RequestsProvider(new RequestHandlerProviderMock());

        expect(requestsProvider.auth.constructor).toBe(Auth);
    });
});