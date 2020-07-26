import {RequestHandlerProvider} from '../../request-handler/request-handler';
import {User} from '../../../models/user/user';
import {Contact} from '../../../models/user/contact';

export default class Social {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerProvider) {
    }

    /**
     * Loads all contacts for a user
     * @param userId
     * @param showLoading
     */
    async loadUser(userId: number, showLoading = true): Promise<User> {
        return this.requestHandler.get('users/' + userId, true, showLoading, {}).then(response => {
            return Promise.resolve(new User(response));
        });
    }

    /**
     * Loads all contacts for a user
     * @param me
     * @param showLoading
     */
    async loadContacts(me: User, showLoading = false): Promise<Contact[]> {
        return this.requestHandler.get('users/' + me.id + '/contacts', true,  showLoading, [
                'initiatedBy',
                'requested',
            ], {}, {}, {}, 100).then(response => {
                const result = response && response.data ?  response.data.map(data => new Contact(data)) : [];
                return Promise.resolve(result);
            }
        );
    }

    /**
     * Creates a contact request from the logged in user to another
     * @param me
     * @param requested
     */
    async createContact(me: User, requested: User): Promise<Contact> {
        return this.requestHandler.post('users/' + me.id + '/contacts', true, true, {
            requested_id: requested.id,
        }).then(response => {
            return Promise.resolve(new Contact(response));
        });
    }

    /**
     * Denies a contact request
     * @param me
     * @param contact
     * @param showLoading
     */
    async denyContact(me: User, contact: Contact, showLoading = true): Promise<Contact> {
        return this.requestHandler.put('users/' + me.id + '/contacts/' + contact.id, true, showLoading, {
            deny: true,
        }).then (result => {
            return Promise.resolve(new Contact(result));
        });
    }

    /**
     * Confirms a contact request
     * @param me
     * @param contact
     * @param showLoading
     */
    async confirmContact(me: User, contact: Contact, showLoading = true): Promise<Contact> {
        return this.requestHandler.put('users/' + me.id + '/contacts/' + contact.id, true, showLoading, {
            confirm: true,
        }).then (result => {
            return Promise.resolve(new Contact(result));
        });
    }
}
