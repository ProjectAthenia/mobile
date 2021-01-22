import {BaseModel} from '../base-model';
import {User} from '../user/user';

/**
 * Used as a data wrapper for our ballot item option model
 */
export class BallotItemOption extends BaseModel
{

    /**
     * THe subject type this is for
     */
    subject_type: string;

    /**
     * The id of the subject
     */
    subject_id: number;

    /**
     * The generic subject data
     */
    _subject: any;

    /**
     * Gets the subject data properly
     */
    get subject()
    {
        switch (this.subject_type) {
            case 'user':
                return new User(this._subject);
            // Add more types here
            default:
                return this._subject;
        }
    }

    /**
     * Sets the subject data for us
     * @param data
     */
    set subject(data)
    {
        this._subject = data;
    }

    /**
     * Gets the description we want to display
     */
    getDescription(): string
    {
        switch (this.subject_type) {
            case 'user':
                return (this.subject as User).name;

            // Add more types here

            default:
                return 'An Option';
        }
    }
}
