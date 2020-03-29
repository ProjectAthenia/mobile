import {BaseModel} from './base-model';
import {Relation} from './relation';

export class Page<Model> extends BaseModel{

    /**
     * The total amount of data
     */
    total: number;

    /**
     * What page we are currently on
     */
    current_page: number;

    /**
     * The last page of all results
     */
    last_page: number;

    /**
     * All entries within this page
     */
    data: Model[];

    /**
     * Default Constructor
     * @param rawData
     * @param modelConstructor
     */
    constructor(rawData, modelConstructor) {
        super(rawData, {
            data: new Relation('array', modelConstructor),
        });
    }
}
