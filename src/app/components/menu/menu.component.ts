import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AlertController, MenuController, NavController, Platform} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user/user';
import {Organization} from '../../models/organization/organization';
import {OrganizationService} from '../../services/organization.service';
import {StorageProvider} from '../../providers/storage/storage';
import {AuthManagerService} from '../../services/auth-manager/auth-manager.service';
import {UserService} from '../../services/user.service';
import {MessagingService} from '../../services/messaging.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit
{
    /**
     * The logged in user
     */
    me: User;

    /**
     * Whether or not the user has unseen messages
     */
    hasUnseenMessages = false;

    /**
     * Default Constructor
     * @param platform
     * @param alertController
     * @param menuCtl
     * @param navCtl
     * @param userService
     * @param authManagerService
     * @param storage
     * @param messagingService
     * @param organizationService
     */
    constructor(private platform: Platform,
                private alertController: AlertController,
                private menuCtl: MenuController,
                private navCtl: NavController,
                private userService: UserService,
                private authManagerService: AuthManagerService,
                private storage: StorageProvider,
                private messagingService: MessagingService,
                private organizationService: OrganizationService)
    {}

    /**
     * Gets everything set
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
            this.userService.getMeObserver().subscribe({next: user => {
                this.me = user;
                if (this.socialMediaEnabled()) {
                    this.initiateMessageNotificationBubble(user);
                }
            }});
        });
    }

    /**
     * Whether or not this app has subscriptions enabled
     */
    hasSubscriptions()
    {
        return environment.subscriptions_enabled;
    }

    /**
     * Takes the user to a page that is passed in properl
     * @param page
     */
    goTo(page: string)
    {
        this.menuCtl.close('side-menu').catch(console.error);
        if (page === 'home') {
            this.navCtl.navigateRoot(page).catch(console.error);
        } else {
            this.navCtl.navigateForward(page).catch(console.error);
        }
    }

    /**
     * Whether or not this app has subscriptions enabled
     */
    socialMediaEnabled()
    {
        return environment.social_media_enabled;
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
     * Whether or not this app has organization creation enabled
     */
    organizationsEnabled()
    {
        return environment.organizations_enabled;
    }

    /**
     * Returns true for whether ro not the user can manager an organization
     */
    hasOrganizations()
    {
        return this.me && this.me.organization_managers.length > 0;
    }

    /**
     * Asks the user what organization they want to access
     */
    openOrganizationDialogue()
    {
        const organizationManagers = this.me.organization_managers;

        if (organizationManagers.length == 1) {
            this.goToOrganization(organizationManagers[0].organization);
        }

        else {
            let activeAlert;
            this.alertController.create({
                header: 'Select Organization',
                inputs: organizationManagers.map(organizationManager => ({
                    type: 'radio',
                    label: organizationManager.organization.name,
                    handler: (input) => {
                        activeAlert.dismiss();
                        this.goToOrganization(organizationManager.organization);
                    }
                })),
            }).then(alert => {
                activeAlert = alert;
                alert.present();
            });
        }
    }

    /**
     * Goes to the organization dashboard
     * @param organization
     */
    goToOrganization(organization: Organization)
    {
        this.organizationService.cacheOrganization(organization);
        this.menuCtl.close('side-menu').catch(console.error);
        this.navCtl.navigateRoot('/organization-dashboard/' + organization.id).catch(console.error);
    }

    /**
     * Handles the logout properly
     */
    handleLogout()
    {
        AppComponent.LOGGED_IN = false;
        this.menuCtl.close('side-menu').catch(console.error);
        this.storage.logOut().catch(console.error);
        this.navCtl.navigateRoot('/sign-in').catch(console.error);
    }
}
