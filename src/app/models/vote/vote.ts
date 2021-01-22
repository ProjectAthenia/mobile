import {BaseModel} from '../base-model';

/**
 * Used as a data wrapper for our ballot model
 */
export class Vote extends BaseModel
{

    /**
     * The result recorded
     */
    result: number;

    /**
     * The id of the option this is related to
     */
    ballot_item_option_id: number;
}
