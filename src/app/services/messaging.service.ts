import { Injectable } from '@angular/core';
import {Thread} from '../models/user/thread';
import {User} from '../models/user/user';
import {RequestsProvider} from '../providers/requests/requests';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService
{
    /**
     * All loaded threads in the system
     */
    loadedThreads: Thread[];

    /**
     * The observer for listening to unseen messages
     */
    readonly unseenMessageObserver: Observable<number>;

    /**
     * The subscriber to listen for unseen messages
     */
    private unseenMessageSubscribers: Subscriber<number>[] = [];

    /**
     * Default Constructor
     * @param requestsProvider
     */
    constructor(private requestsProvider: RequestsProvider)
    {
        this.unseenMessageObserver = new Observable((subscriber) => {
            this.unseenMessageSubscribers.push(subscriber);
        });
    }

    /**
     * gets the logout observer for our user to link to
     */
    getUnseenNotificationObservable(): Observable<number>
    {
        return this.unseenMessageObserver;
    }

    /**
     * Tells us whether or not the most recently received notification has been seen
     */
    hasUnseenThreadMessages(me: User): number
    {
        return this.loadedThreads.map(thread => !thread.hasUserSeenThread(me)).length;
    }

    /**
     * Notifies all unseen notifications subscribers of a change in our unseen notifications
     * @param amount
     */
    notifyUnseenNotificationSubscribers(amount: number)
    {
        this.unseenMessageSubscribers.forEach(subscriber => {
            subscriber.next(amount);
        });
    }

    /**
     * Refreshes the notifications properly, and then returns all that we currently have
     * @param me
     * @param showLoading
     */
    refreshThreads(me: User, showLoading: boolean): Promise<Thread[]>
    {
        return this.requestsProvider.messaging.getThreads(me, showLoading).then(page => {
            this.loadedThreads = page.data;
            this.notifyUnseenNotificationSubscribers(this.hasUnseenThreadMessages(me));
            return Promise.resolve(this.loadedThreads);
        });
    }

    /**
     * Sets a thread object into cache
     * @param thread
     */
    cacheThread(thread: Thread)
    {
        this.loadedThreads[thread.id] = thread;
    }

    /**
     * Gets a thread by an id
     * @param id
     */
    getThread(id: number): Thread | null
    {
        return this.loadedThreads[id] ? this.loadedThreads[id] : null;
    }

    /**
     * Gets a thread between two users
     * @param me
     * @param otherUser
     */
    getThreadBetweenPeople(me: User, otherUser: User): Thread | null
    {
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
