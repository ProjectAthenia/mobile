import {BaseModel} from './base-model';

/**
 * Data wrapper for our feature information
 */
export class Feature extends BaseModel
{
    /**
     * The name of this feature
     */
    name: string;

    /**
     * The description of the feature
     */
    description: string;
}
