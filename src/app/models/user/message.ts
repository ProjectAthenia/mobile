import {BaseModel} from '../base-model';

/**
 * Used as a data wrapper for our message model
 */
export class Message extends BaseModel {

    /**
     * The users in a thread
     */
    created_at: Date;

    /**
     * Key value object that holds the message under a key named `message`
     */
    data: any;

    /**
     * The date time for when this message was seen
     */
    seen_at: Date;

    /**
     * The id of the user that this message is from
     */
    from_id: number;

    /**
     * The id of the user that this message is to
     */
    to_id: number;

    /**
     * Default constructor
     * @param rawData
     */
    constructor(rawData) {
        super(rawData, {}, [
            'created_at',
            'seen_at',
        ]);
    }

    /**
     * Formats the date properly
     */
    formatDate(): string {
        const now = new Date();
        if (now.getDate() === this.created_at.getDate() &&
            now.getFullYear() === this.created_at.getFullYear() &&
            now.getMonth() === this.created_at.getMonth()) {
            const baseHours = this.created_at.getHours();
            const pm = baseHours > 12;
            return (pm ? baseHours -  12 : baseHours) + ':' + this.created_at.getMinutes() +
                ' ' + (pm ? 'pm' : 'am');
        } else {
            return (this.created_at.getMonth() + 1) + '/' + this.created_at.getDate();
        }
    }
}
