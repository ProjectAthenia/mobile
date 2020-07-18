import {OrganizationManager} from './organization-manager';
import {Organization} from './organization';

describe('Test Organization Manager Model', () => {

    it('Make sure that the organization manager model is being built properly', () => {
        const model = new OrganizationManager({
            role_id: 3,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the organization manager model is being built properly with a membership plan connected', () => {
        const model = new OrganizationManager({
            active: false,
            cost: 3.99,
            organization: {
                id: 4,
                name: 'An Organization',
            }
        });

        expect(model).toBeTruthy();
        expect(model.organization.constructor).toBe(Organization);
    });
});
