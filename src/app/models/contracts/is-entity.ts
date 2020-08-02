/**
 * An interface to apply to a model that makes it easier to pass around as an entity
 */
export default interface IsEntity {

    /**
     * All entities have an id
     */
    id?: number;

    /**
     * The route for the entity
     */
    baseRoute(): string;
}
