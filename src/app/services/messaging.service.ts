import { Injectable } from '@angular/core';
import {Thread} from '../models/user/thread';
import {User} from '../models/user/user';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    /**
     * All loaded threads in the system
     */
    loadedThreads: any = {};

    /**
     * Sets a thread object into cache
     * @param thread
     */
    cacheThread(thread: Thread) {
        this.loadedThreads[thread.id] = thread;
    }

    /**
     * Gets a thread by an id
     * @param id
     */
    getThread(id: number): Thread | null {
        return this.loadedThreads[id] ? this.loadedThreads[id] : null;
    }

    /**
     * Gets a thread between two users
     * @param me
     * @param otherUser
     */
    getThreadBetweenPeople(me: User, otherUser: User): Thread | null {
        for (const key in this.loadedThreads) {
           if (this.loadedThreads.hasOwnProperty(key)) {
               let hasMe = false;
               let hasOtherUser = false;
               const thread = this.loadedThreads[key];

               thread.users.forEach(user => {
                   if (user.id === me.id) {
                       hasMe = true;
                   }
                   if (user.id === otherUser.id) {
                       hasOtherUser = true;
                   }
               });

               if (hasMe && hasOtherUser) {
                   return thread;
               }
           }
        }
    }
}
