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
    loadedThreads: Thread[] = [];

    /**
     * Whether or not we have loaded the threads yet
     */
    hasLoadedThreads = false;

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
    getUnseenMessageObservable(): Observable<number>
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
     * @param me
     */
    notifyUnseenNotificationSubscribers(me: User)
    {
        this.unseenMessageSubscribers.forEach(subscriber => {
            subscriber.next(this.hasUnseenThreadMessages(me));
        });
    }

    /**
     * Loads the amount of unseen thread messages to allow us to initiate the full data flow
     * @param me
     * @param showLoading
     */
    loadUnseenThreadMessages(me: User, showLoading: boolean): Promise<number>
    {
        if (!this.hasLoadedThreads) {
            return this.refreshThreads(me, showLoading).then(() => {
                return Promise.resolve(this.hasUnseenThreadMessages(me));
            })
        }
        return Promise.resolve(this.hasUnseenThreadMessages(me));
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
            this.hasLoadedThreads = true;
            this.notifyUnseenNotificationSubscribers(me);
            return Promise.resolve(this.loadedThreads);
        });
    }

    /**
     * Sets a thread object into cache
     * @param thread
     */
    cacheThread(thread: Thread)
    {
        this.loadedThreads.push(thread);
    }

    /**
     * Gets a thread by an id
     * @param id
     */
    getThread(id: number): Thread | null
    {
        return this.loadedThreads.find(i => i.id == id);
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
