import {RequestsProvider} from "./requests";
import RequestHandlerProviderMock from "../request-handler/request-handler.mock";

/**
 * Mock for the requests provider
 */
export default class RequestsProviderMock extends RequestsProvider {
    constructor() {
        super(new RequestHandlerProviderMock());
    }
}
