import Role from './role';

describe('Test Role Model', () => {

    it('Make sure that the role model is being built properly', () => {
        const model = new Role({
            id: 4,
        });

        expect(model).toBeTruthy();
    });
});
