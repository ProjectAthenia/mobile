import Auth from './auth';
import {RequestHandlerProvider} from "../../request-handler/request-handler";
import RequestHandlerProviderMock from "../../request-handler/request-handler.mock";
import {User} from "../../../models/user/user";
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Asset} from '../../../models/asset';

describe('Test the auth requests', () => {
    let requestHandler : RequestHandlerProvider;
    let auth : Auth;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        auth = new Auth(requestHandler);
    });

    it("Creates a sign in request properly", async () => {
        const email = "test@test.com";
        const password = "password";

        const handler = () => {};

        spyOn(requestHandler, "post");
        let result = await auth.signIn(email, password, handler);
        expect(requestHandler.post).toHaveBeenCalledWith(
            "auth/login",
            false,
            true,
            {email: email, password: password},
            {401: handler}
        );
    });

    it("Creates a sign up request properly", async () => {
        const data = {
            name : 'A Person',
            email : "test@test.com",
            password : "password",
        };

        const handler = () => {};

        spyOn(requestHandler, "post");
        await auth.signUp(data, handler);
        expect(requestHandler.post).toHaveBeenCalledWith(
            "auth/sign-up",
            false,
            true,
            data,
            {400: handler}
        );
    });

    it('Creates a request for loading a users initial information properly', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            id: 324,
            email: 'test@test.com',
            first_name: 'name',
            roles: [],
        }));
        const result = await auth.loadInitialInformation();
        expect(result.id).toBe(324);
    });

    it('Creates a request for updating user properly', async () => {

        spyOn(requestHandler, 'put').and.returnValue(Promise.resolve({
            id: 324,
            email: 'test@test.com',
            first_name: 'name',
            roles: [],
        }));
        const user = new User({id: 324});
        const result = await auth.updateUser(user, {});
        expect(result.id).toBe(324);
    });
});
