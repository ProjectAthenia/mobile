import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import {UserService} from '../../services/user.service';
import {MessagingService} from '../../services/messaging.service';
import {User} from '../../models/user/user';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-logged-in-header',
    templateUrl: './logged-in-header.component.html',
    styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent implements OnInit
{
    /**
     * The header for this page
     */
    @ViewChild('header', {static: false})
    header: any;

    /**
     * Whether or not this shows up on the home screen
     */
    @Input()
    isHome: boolean;

    /**
     * Whether or not the user is on android
     */
    isAndroid: boolean;

    /**
     * Whether or not this user has unseen messages
     */
    hasUnseenMessages: boolean;

    /**
     * Default Constructor
     * @param requests
     * @param navController
     * @param messagingService
     * @param platform
     * @param userService
     */
    constructor(private requests: RequestsProvider,
                private navController: NavController,
                private messagingService: MessagingService,
                private platform: Platform,
                private userService: UserService)
    {}

    /**
     * Checks whether or not this is running on android
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            this.isAndroid = this.platform.is('android');
            this.userService.getMe().then(me => {
                if (environment.social_media_enabled) {
                    this.initiateMessageNotificationBubble(me);
                }
            });
        });
    }

    /**
     * Initiates our message listener
     * @param me
     */
    initiateMessageNotificationBubble(me: User)
    {
        this.messagingService.loadUnseenThreadMessages(me, false).then(unseen => {
            this.hasUnseenMessages = unseen > 0;
            this.messagingService.getUnseenMessageObservable().subscribe({
                next: value => {
                    this.hasUnseenMessages = value > 0;
                }
            });
        });
    }

    /**
     * Goes to the home page
     */
    goHome()
    {
        this.navController.navigateBack('home').catch(console.error);
    }

    /**
     * Determines whether or not we want to show the branding in the header
     */
    showBranding()
    {
        return this.isHome || this.isAndroid;
    }
}
