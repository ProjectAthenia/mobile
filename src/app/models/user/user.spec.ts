///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
import {User} from './user';

describe('Test User Model', () => {

    it('Make sure that the user model is being built properly', () => {
        const model = new User({
            id: 4,
            name: 'Sven Nevs',
            email: 'test@test.com',
        });

        expect(model).toBeTruthy();
    });
});
