import {Relation} from "./relation";
import {BaseModel} from "./base-model";

describe('Test that relations can build data properly.', () => {

    it('Make sure that we can handle single objects properly. ', () => {
        const relation = new Relation('model', BaseModel);

        let result = relation.transformData({
            id: 124,
            temp: 'test',
        });

        expect(result.constructor).toBe(BaseModel);
        expect((result as any).id).toBe(124);
    });
    it('Make sure that we can an array of objects properly. ', () => {
        const relation = new Relation('array', BaseModel);

        let result = relation.transformData([{
            id: 124,
            temp: 'test',
        }]);

        expect(result.constructor).toBe(Array);
        expect(result[0].id).toBe(124);
    });
});