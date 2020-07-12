import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import {User} from '../../../models/user/user';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Asset} from '../../../models/asset';
import OrganizationRequests from './organization';
import {Organization} from '../../../models/organization/organization';

describe('Test the auth requests', () => {
    let requestHandler : RequestHandlerProvider;
    let organizationRequests : OrganizationRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        organizationRequests = new OrganizationRequests(requestHandler);
    });

    it('Creates a request properly for creating an organization', async () => {
        const name = 'An Organization';

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            name: name
        }));
        let result = await organizationRequests.createOrganization(name);
        expect(requestHandler.post).toHaveBeenCalledWith(
            'organizations',
            true,
            true,
            {name: name},
        );
        expect(result.constructor).toBe(Organization);
    });
});
