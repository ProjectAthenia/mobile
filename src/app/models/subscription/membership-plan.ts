import {BaseModel} from '../base-model';
import {Feature} from '../feature';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our membership plan model
 */
export class MembershipPlan extends BaseModel {

    /**
     * The name of the membership plan
     */
    name: string;

    /**
     * The duration for the membership plan
     */
    duration: string;

    /**
     * The current cost of the membership plan
     */
    current_cost: number;

    /**
     * The id of the current rate model
     */
    current_rate_id: number;

    /**
     * Whether or not this is the default membership plan in the system
     */
    default: boolean;

    /**
     * All features contained in this
     */
    features: Feature[];

    /**
     * Default constructor
     * @param data
     */
    constructor(data)
    {
        super(data, {
            features: new Relation('array', Feature),
        });
    }

    /**
     * Allows us to figure out whether or not this
     * @param featureId
     */
    containsFeatureId(featureId: number): boolean
    {
        return this.features.find(feature => feature.id == featureId) != null;
    }
}
