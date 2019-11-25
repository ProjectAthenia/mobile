import {BaseModel} from '../base-model';
import {User} from './user';
import {Relation} from '../relation';
import {Message} from './message';

/**
 * Used as a data wrapper for our thread model
 */
export class Thread extends BaseModel {

    /**
     * The users in a thread
     */
    users: User[];

    /**
     * The last message received in this thread
     */
    last_message: Message;

    /**
     * Default constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            users: new Relation('array', User),
            last_message: new Relation('model', Message),
        });
    }
}
