import {BaseModel} from '../base-model';
import {BallotItem} from './ballot-item';
import {Relation} from '../relation';

export type BallotType =
    'single_option' |
    'multiple_options' |
    'ranked_choice';

/**
 * Used as a data wrapper for our ballot model
 */
export class Ballot extends BaseModel
{

    /**
     * The name of the ballot
     */
    name: string;

    /**
     * The type of ballot
     */
    type: BallotType;

    /**
     * All items within the ballot
     */
    ballot_items: BallotItem[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data)
    {
        super(data, {
            ballot_items: new Relation('array', BallotItem),
        });
    }
}
