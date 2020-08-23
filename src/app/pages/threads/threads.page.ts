import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, NavController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {Thread} from '../../models/user/thread';
import {MessagingService} from '../../services/messaging.service';
import {Message} from '../../models/user/message';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.page.html',
    styleUrls: ['./threads.page.scss'],
})
export class ThreadsPage implements OnInit, OnDestroy {

    /**
     * The search bar
     */
    @ViewChild('filterBar', { static: false })
    filterBar: IonSearchbar;

    /**
     * The logged in user
     */
    me: User;

    /**
     * All threads that this user is apart of
     */
    threads: Thread[] = [];

    /**
     * Current visible threads based on search term
     */
    visibleThreads: Thread[] = [];

    /**
     * boolean flag for whether or not everything is all set
     */
    loaded = false;

    /**
     * The handle to the current refresh timeout
     */
    refreshTimeout: any;

    /**
     * Default Constructor
     * @param navController
     * @param toastController
     * @param messagingService
     * @param userService
     */
    constructor(private navController: NavController,
                private toastController: ToastController,
                private messagingService: MessagingService,
                private userService: UserService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.userService.getMe().then(me => {
            this.me = me;
            this.messagingService.getUnseenMessageObservable().subscribe({
                next: () => {
                    this.parseThreads(this.messagingService.loadedThreads);
                },
            });
            this.loadThreads();
        }).catch(() => {
            // This should never happen, but just in case
            this.navController.navigateRoot('/');
            this.toastController.create({
                message: 'Error Loading User',
                duration: 4000,
                position: 'top'
            }).then(toast => {
                toast.present().catch(console.error);
            });
        });
    }

    /**
     * Clears out the refresh timeout
     */
    ngOnDestroy() {
        clearTimeout(this.refreshTimeout);
    }

    /**
     * Loads all threads freshly from the server
     */
    loadThreads() {
        this.messagingService.refreshThreads(this.me, !this.loaded).then(threads => {
            this.parseThreads(threads);
        });
    }

    /**
     * Parses a list of threads into the visible threads
     * @param threads
     */
    parseThreads(threads: Thread[])
    {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }
        this.threads = threads.sort((threadA, threadB) => {
            if (threadA.last_message && threadB.last_message) {
                if (threadA.last_message.created_at < threadB.last_message.created_at) {
                    return 1;
                } else {
                    return -1;
                }
            }
            return 0;
        });
        if (this.filterBar) {
            this.filterThreads();
        } else {
            this.visibleThreads = this.threads;
        }
        this.loaded = true;

        this.refreshTimeout = setTimeout(this.loadThreads.bind(this), 30 * 1000);
    }

    /**
     * Takes us to a thread
     * @param thread
     */
    goToThread(thread: Thread) {

        let otherUser: User = null;
        thread.users.forEach(user => {
            if (user.id !== this.me.id) {
                otherUser = user;
            }
        });

        if (otherUser != null) {
            this.userService.cacheUser(otherUser);
            this.navController.navigateForward('/user/' + otherUser.id + '/message').catch(console.error);
        }
    }

    /**
     * Gets the other username in a thread
     * @param thread
     */
    getOtherUserName(thread: Thread) {
        let userName = '';

        thread.users.forEach(user => {
            if (user.id !== this.me.id) {
                userName = user.name;
            }
        });

        return userName;
    }

    /**
     * Gets the last message sent
     * @param thread
     */
    getLastMessage(thread: Thread): Message | null {
        return thread && thread.last_message ?
            thread.last_message : null;
    }

    /**
     * Determines whether or not this message is mine or last seen by me
     * @param thread
     */
    isLastMessageMineOrSeen(thread: Thread): boolean {
        const message = this.getLastMessage(thread);

        if (message) {
            return message.from_id === this.me.id || message.seen_at != null;
        }
        return false;
    }

    /**
     * Gets the last message sent
     * @param thread
     */
    getLastMessageContent(thread: Thread) {
        const lastMessage = this.getLastMessage(thread);
        return lastMessage && lastMessage.data && lastMessage.data.body
            ? lastMessage.data.body : null;
    }

    /**
     * Filters the threads by the search term
     */
    filterThreads() {
        this.filterBar.getInputElement().then(inputElement => {
            if (inputElement.value.length > 0) {
                this.visibleThreads = this.threads.filter(thread => {
                    return this.getOtherUserName(thread).indexOf(inputElement.value) !== -1;
                });
            } else {
                this.visibleThreads = this.threads;
            }
        });
    }

    /**
     * Gets the last message date text
     * @param thread
     */
    getLastMessageDate(thread: Thread) {
        const lastMessage = this.getLastMessage(thread);
        return lastMessage && lastMessage.created_at ? lastMessage.formatDate() : null;
    }
}
