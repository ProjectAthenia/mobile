import {Injectable} from '@angular/core';

@Injectable()
export class ArrayHelpersProvider {
    /**
     * Shuffles an array values, should be put into a provider
     * @param {T[]} array
     * @returns {T[]}
     */
    static shuffle<T>(array: T[]): T[] {
        if (!Array.isArray(array)) {
            throw new TypeError(`Expected an Array, got ${typeof array} instead.`);
        }

        const oldArray = [...array];
        let newArray = [];

        while (oldArray.length) {
            const i = Math.floor(Math.random() * oldArray.length);
            newArray = newArray.concat(oldArray.splice(i, 1));
        }

        return newArray;
    }
}
