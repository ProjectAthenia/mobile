import {RequestHandlerProvider} from '../../request-handler/request-handler';
import RequestHandlerProviderMock from '../../request-handler/request-handler.mock';
import Features from './features';
import {Feature} from '../../../models/feature';

describe('Test the feature requests', () => {
    let requestHandler : RequestHandlerProvider;
    let features : Features;

    beforeEach(() => {
        requestHandler = new RequestHandlerProviderMock();
        features = new Features(requestHandler);
    });

    it('Creates a request for fetching features properly', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [
                {
                    id: 14,
                    name: 'Feature 1',
                },
                {
                    id: 12,
                    name: 'Feature 2',
                },
            ],
        }));
        const result = await features.fetchFeatures();
        expect(result[0].constructor).toBe(Feature);
        expect(result[1].constructor).toBe(Feature);
    });
});
