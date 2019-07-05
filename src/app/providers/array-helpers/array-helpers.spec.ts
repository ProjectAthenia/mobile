///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>
import {ArrayHelpersProvider} from "./array-helpers";

describe('Test Array Helpers Provider', () => {

    it( 'should return an array of the same length regardless of duplicate entries when shuffling', () => {
        let array = [4,754,24,77,1,4];

        let result = ArrayHelpersProvider.shuffle(array);

        expect(result.length).toBe(array.length);
    });

    it('should not have any different entries between the original data set and the result.', () => {
        let array = [4,754,24,77,1];

        let result = ArrayHelpersProvider.shuffle(array);

        expect(array.filter((entry) => result.indexOf(entry) < 0).length).toBe(0);
    });
});