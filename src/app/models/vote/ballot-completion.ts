import {BaseModel} from '../base-model';
import {Vote} from './vote';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our ballot model
 */
export class BallotCompletion extends BaseModel
{

    /**
     * The id of the ballot that was completed
     */
    ballot_id: number;

    /**
     * All votes that were filled out
     */
    votes: Vote[];

    /**
     * Default Constructors
     * @param data
     */
    constructor(data)
    {
        super(data, {
            votes: new Relation('array', Vote),
        });
    }
}
