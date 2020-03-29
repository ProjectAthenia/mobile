import {Asset} from './asset';

describe('Test Asset Model', () => {

    it('Make sure that the asset model is being built properly', () => {
        const model = new Asset({
            id: 4,
        });

        expect(model).toBeTruthy();
    });

    it('Make sure that the isImage function returns properly', () => {
        let model = new Asset({
            url: 'http://text.com/test.txt',
        });

        expect(model.isImage()).toBeFalsy();

        model = new Asset({
            url: 'http://text.com/test.jpg',
        });
        expect(model.isImage()).toBeTruthy();

        model = new Asset({
            url: 'http://text.com/test.png',
        });
        expect(model.isImage()).toBeTruthy();

        model = new Asset({
            url: 'http://text.com/test.gif',
        });
        expect(model.isImage()).toBeTruthy();

        model = new Asset({
            url: 'http://text.com/test.jpeg',
        });
        expect(model.isImage()).toBeTruthy();

        model = new Asset({
            url: 'http://text.com/test.psd',
        });
        expect(model.isImage()).toBeFalsy();
    });
});
