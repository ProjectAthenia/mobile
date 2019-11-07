import {Article} from './article';

describe('Test Article Model', () => {

    it('Make sure that the article model is being built properly', () => {
        const model = new Article({
            id: 4,
            title: 'An Article',
            content: 'Some Content',
        });

        expect(model).toBeTruthy();
    });
});
