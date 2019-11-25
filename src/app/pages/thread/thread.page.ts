import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea, NavController, ToastController} from '@ionic/angular';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';
import {RequestsProvider} from '../../providers/requests/requests';
import {Thread} from '../../models/user/thread';
import {MessagingService} from '../../services/messaging.service';
import {Message} from '../../models/user/message';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.page.html',
    styleUrls: ['./thread.page.scss'],
})
export class ThreadPage implements OnInit, OnDestroy {

    /**
     * The message input
     */
    @ViewChild('messageInput', { static: true })
    messageInput: IonTextarea;

    /**
     * The logged in user
     */
    me: User;

    /**
     * The user the logged in user is messaging
     */
    user: User;

    /**
     * The current thread on this page
     */
    thread: Thread;

    /**
     * All messages in this thread
     */
    messages: Message[] = [];

    /**
     * Whether or not the initial load is complete
     */
    loaded = false;

    /**
     * The handle to the current refresh timeout
     */
    refreshTimeout: any;

    /**
     * The message the user has entered
     */
    enteredMessage = '';

    /**
     * Default Constructor
     * @param router
     * @param navController
     * @param toastController
     * @param requests
     * @param messagingService
     * @param firebase
     * @param route
     * @param userService
     */
    constructor(private router: Router,
                private navController: NavController,
                private toastController: ToastController,
                private requests: RequestsProvider,
                private messagingService: MessagingService,
                private firebase: FirebaseX,
                private route: ActivatedRoute,
                private userService: UserService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        const userId = parseInt(this.route.snapshot.paramMap.get('user_id'), 0);
        this.me = this.userService.getMe();
        const user = this.userService.getUser(userId);

        // This should never happen, but just in case
        if (this.me == null) {
            this.navController.back();
            this.toastController.create({
                message: 'Error Loading User',
                duration: 4000,
                position: 'top'
            }).then(toast => {
                toast.present().catch(console.error);
            });

            return;
        }

        if (user == null) {
            this.requests.social.loadUser(userId).then(loadedUser => {
                this.userService.cacheUser(loadedUser);
                this.loadThread(loadedUser);
            }).catch(error => {
                this.navController.navigateBack('/');
                this.toastController.create({
                    message: 'Error Loading User',
                    duration: 4000,
                    position: 'top'
                }).then(toast => {
                    toast.present().catch(console.error);
                });
            });
        } else {
            this.loadThread(user);
        }
    }

    /**
     * Loads the thread data from cache or the server
     * @param user
     */
    loadThread(user: User) {

        this.user = user;
        this.thread = this.messagingService.getThreadBetweenPeople(this.me, this.user);

        if (this.thread) {
            this.initMessages();
        } else {
            this.requests.messaging.getThreads(this.me, true).then(threads => {
                threads.forEach(thread => this.messagingService.cacheThread(thread));
                this.thread = this.messagingService.getThreadBetweenPeople(this.me, this.user);
                if (this.thread == null) {
                    this.requests.messaging.createThread(this.me, this.user).then(thread => {
                        this.messagingService.cacheThread(thread);
                        this.thread = thread;
                        this.initMessages();
                    }).catch(error => {
                        console.error('create', error);
                        this.navController.back();
                    });
                } else {
                    this.initMessages();
                }
            }).catch(error => {
                this.navController.back();
            });
        }
    }

    /**
     * Clears out the refresh timeout
     */
    ngOnDestroy() {
        clearTimeout(this.refreshTimeout);
    }

    /**
     * Initializes the messages load properly
     */
    initMessages() {
        this.firebase.onMessageReceived().subscribe(notification => {
            if (notification.action === this.router.url) {
                this.loadMessages();
            }
        });
        this.loadMessages();
    }

    /**
     * Loads all threads freshly from the server
     */
    loadMessages() {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }

        this.requests.messaging.getMessages(this.me, this.thread, !this.loaded).then(messages => {
            this.thread.last_message = messages[0];
            this.messages = messages.reverse();
            if (!this.loaded) {
                this.resetScroll();
                this.loaded = true;
            }
            this.messagingService.cacheThread(this.thread);

            this.refreshTimeout = setTimeout(this.loadMessages.bind(this), 5 * 1000);
            if (this.thread.last_message.seen_at == null && this.thread.last_message.from_id !== this.me.id) {
                this.requests.messaging.markMessageAsSeen(this.me, this.thread, this.thread.last_message).then(message => {
                    if (this.thread.last_message.id === message.id) {
                        this.thread.last_message = message;
                        this.messagingService.cacheThread(this.thread);
                    }
                });
            }
        });
    }

    /**
     * Resets the scroll to be on the bottom
     */
    resetScroll() {
        setTimeout(() => {
            const messagesWrapper = document.getElementById('messages');
            if (messagesWrapper) {
                messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
            }
        }, 1);
    }

    /**
     * Gets the thumbnail style for a message
     * @param message
     */
    thumbnailStyle(message: Message) {
        const fromUser = this.thread.users.find(user => {
            return user.id === message.from_id;
        });
        // You can add any custom thumbnails based on the from user here
        return fromUser ? {} : {};
    }

    /**
     * Sets the content of the currently entered message
     */
    setEnteredMessage() {
        this.enteredMessage = this.messageInput.value;
    }

    /**
     * Sends the message to the server
     */
    sendMessage() {
        this.requests.messaging.createMessage(this.me, this.thread, this.enteredMessage).then(message => {
            this.thread.last_message = message;
            this.enteredMessage = '';
            this.messageInput.value = '';
            this.messages.push(message);
            this.messagingService.cacheThread(this.thread);
            this.resetScroll();
        });
    }
}
