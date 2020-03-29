import {Page} from './page';
import {Resource} from './resource';

describe('Test Page Model', () => {

    it('Make sure that the page model is being built properly with the correct data types', () => {
        const model = new Page({
            id: 4,
            data: [
                {
                    id: 4,
                    resource_type: 'event',
                    resource: {
                        id: 545,
                        name: 'An Event',
                    },
                }
            ]
        }, Resource);

        expect(model).toBeTruthy();
        expect(model.data[0].constructor).toBe(Resource);
    });
});
