import {BaseModel} from '../base-model';
import {BallotItemOption} from './ballot-item-option';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our ballot model
 */
export class BallotItem extends BaseModel
{

    /**
     * The name of the ballot item used to
     */
    name: string;

    /**
     * The options for this ballot item
     */
    ballot_item_options: BallotItemOption[];

    /**
     * Default constructor
     * @param data
     */
    constructor(data)
    {
        super(data, {
            ballot_item_options: new Relation('array', BallotItemOption),
        });
    }
}
