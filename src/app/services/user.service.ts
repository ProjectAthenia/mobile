import { Injectable } from '@angular/core';
import {User} from '../models/user/user';
import {Contact} from '../models/user/contact';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    /**
     * The current logged in user
     */
    me: User;

    /**
     * All loaded users in the system
     */
    loadedUsers: any = {};

    /**
     * The contacts that have been loaded
     */
    contacts: Contact[] = [];

    /**
     * Stores the logged in user for us
     * @param user
     */
    storeMe(user: User) {
        this.me = user;
    }

    /**
     * Gets the current logged in user
     */
    getMe(): User | null {
        return this.me;
    }

    /**
     * Sets a user object into cache
     * @param user
     */
    cacheUser(user: User) {
        this.loadedUsers[user.id] = user;
    }

    /**
     * Gets a user by an id
     * @param id
     */
    getUser(id: number): User | null {
        return this.loadedUsers[id] ? this.loadedUsers[id] : null;
    }

    /**
     * Stores a list of contacts into cache
     * @param contacts
     */
    storeContacts(contacts: Contact[]) {
        contacts.forEach(newContact => {
            if (this.contacts.find(oldContact => newContact.id === oldContact.id)) {
                this.contacts = this.contacts.map(oldContact => {
                    return oldContact.id === newContact.id ? newContact : oldContact;
                });
            } else {
                this.contacts.push(newContact);
            }
        });
    }

    /**
     * finds all contacts related to a user
     * @param user
     */
    findContacts(user: User) {
        return this.contacts.filter(contact => {
            return contact.initiated_by_id === user.id || contact.requested_id === user.id;
        });
    }
}
