import { Injectable } from '@angular/core';
import {User} from '../models/user/user';

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
}
