import {BaseModel} from '../base-model';
import {Relation} from '../relation';

/**
 * Used as a data wrapper for our user model
 */
export class User extends BaseModel {

    /**
     * The name the user entered upon sign up
     */
    name: string;

    /**
     * The email address of the user
     */
    email: string;
}
