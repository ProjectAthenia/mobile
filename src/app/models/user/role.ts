import {BaseModel} from '../base-model';

/**
 * Wrapper class for our role
 */
export default class Role extends BaseModel {

    /**
     * These are all of the role ids that are available for this app
     */
    static APP_USER = 1;
    static SUPER_ADMIN = 2;
    static CONTENT_EDITOR = 3;
    static ADMINISTRATOR = 10;
    static MANAGER = 11;
}