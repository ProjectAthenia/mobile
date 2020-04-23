import {RequestHandlerProvider} from "./request-handler";
import {HTTPMock, NativeStorageMock} from "../../../../test-config/mocks/plugins";
import {StorageProvider} from "../storage/storage";
import {AuthManagerService} from '../../services/auth-manager/auth-manager.service';

/**
 * Class for mocking the request handler provider
 */
export default class RequestHandlerProviderMock extends RequestHandlerProvider {

    constructor() {
        super(
            new HTTPMock(),
            null,
            new AuthManagerService(new StorageProvider(new NativeStorageMock())),
            null,
            null,
        );
    }

    requiresAuth() {
        this.authToken = 'a token';
        return Promise.resolve();
    }

    get(route: string, showLoading: boolean, expands: any, success: any = null, customErrorHandlers: any = null, filter: any = null, search: any = null, limit: number = null) {
        return Promise.resolve();
    }

    post(route: string, showLoading: boolean, data: any, success: any = null, customErrorHandlers: any = null) {
        return Promise.resolve();
    }

    put(route: string, showLoading: boolean, data: any, success: any = null, customErrorHandlers: any = null) {
        return Promise.resolve();
    }
}