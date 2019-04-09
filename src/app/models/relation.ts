/**
 * These are the possible available relation types for the time being
 */
type RelationType = 'array' | 'model';

/**
 * class used in order to define relations between models
 */
export class Relation {

    /**
     * Default constructor needed in order to define a model relation
     *
     * @param relationType
     * @param relationConstructor
     */
    constructor(public relationType: RelationType, private relationConstructor: Function) {
    }

    /**
     * Transforms the data from a raw input into a proper structure
     *
     * @param data
     */
    transformData(data: any) {
        try {
            let constructor = this.relationConstructor as ObjectConstructor;
            if (this.relationType == 'array') {
                let result = [];
                data.forEach((entry) => {
                    result.push(new constructor(entry));
                });
                return result;
            } else {
                return new constructor(data);
            }
        } catch (e) {
            // We do not know for sure if this is going to succeed, since the data received here
            // is likely coming to us from an outside API. Catching this and logging it prevents
            // unwanted crashes in production in cases where unsuspected schema changes may have
            // been made.
            console.error('error building an array relation', e);
        }
    }
}