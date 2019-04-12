import {Relation} from './relation';

/**
 * Interface for all relations
 */
export interface RelationMap {
    /**
     * Makes sure that all properties of this type are relations
     */
    [propName: string]: Relation;
}

/**
 * Base model for all data models within the app
 */
export class BaseModel {

    /**
     * auto increment id, which just about every model has
     */
    id?: number;

    /**
     * Default constructor responsible for mapping the data onto the model
     *
     * @param rawData
     * @param relations
     * @param dates
     */
    constructor(private rawData: Object, private relations: RelationMap = {}, private dates: Array<string> = []) {
        for (const property in rawData) {
            if (this.dates.includes(property)) {
                if (rawData[property]) {
                    if (rawData[property].indexOf(' ') !== -1) {
                        const rawDate = rawData[property].split(' ');
                        let baseDate = new Date(rawDate[0]);
                        baseDate = new Date(baseDate.getTime() + baseDate.getTimezoneOffset()*60*1000);
                        if (rawDate[1]) {
                            const time = rawDate[1].split(':');
                            baseDate.setHours(time[0]);
                            baseDate.setMinutes(time[1]);
                            baseDate.setSeconds(time[2]);
                            this[property] = baseDate;
                        }
                        this[property] = baseDate;
                    } else {
                        this[property] = new Date(rawData[property]);
                    }
                }
            } else if (this.relations.hasOwnProperty(property)) {
                this[property] = this.relations[property].transformData(rawData[property]);
            } else {
                this[property] = rawData[property];
            }
        }

        for (const relationName in relations) {
            if (!this[relationName] && relations[relationName].relationType === 'array') {
                this[relationName] = [];
            }
        }
    }
}