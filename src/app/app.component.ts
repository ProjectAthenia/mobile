import { Component } from '@angular/core';
import {AlertController, MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageProvider} from './providers/storage/storage';
import {environment} from '../environments/environment';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {UserService} from './services/user.service';
import {Organization} from './models/organization/organization';

/**
 * Main entry of the app
 */
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    /**
     * Whether or not the user is currently logged in
     */
    static LOGGED_IN = false;

    /**
     * Default Constructor
     * @param platform
     * @param splashScreen
     * @param statusBar
     * @param authManagerService
     * @param navCtl
     * @param alertController
     * @param menuCtl
     * @param storage
     * @param userService
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authManagerService: AuthManagerService,
        private navCtl: NavController,
        private alertController: AlertController,
        private menuCtl: MenuController,
        private storage: StorageProvider,
        private userService: UserService,
    ) {
        this.initializeApp();
    }

    /**
     * Runs everything needed to initialize the app properly
     */
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
            this.storage.loadAuthToken()
            .then(token => {
                this.navCtl.navigateRoot('/home').catch(console.error);
                AppComponent.LOGGED_IN = true;
            }).catch(error => {
                if (environment.sign_up_enabled) {
                    this.navCtl.navigateRoot('/sign-up').catch(console.error);
                } else {
                    this.navCtl.navigateRoot('/sign-in').catch(console.error);
                }
            });
        });
    }

    /**
     * Takes the user to a page that is passed in properl
     * @param page
     */
    goTo(page: string) {
        this.menuCtl.close('side-menu').catch(console.error);
        if (page === 'home') {
            this.navCtl.navigateRoot(page).catch(console.error);
        } else {
            this.navCtl.navigateForward(page).catch(console.error);
        }
    }

    /**
     * Whether or not the user is logged in
     * This is used for component binding
     */
    isLoggedIn() {
        return AppComponent.LOGGED_IN;
    }

    /**
     * Whether or not this app has subscriptions enabled
     */
    hasSubscriptions() {
        return environment.subscriptions_enabled;
    }

    /**
     * Whether or not this app has organization creation enabled
     */
    organizationsEnabled() {
        return environment.organizations_enabled;
    }

    /**
     * Returns true for whether ro not the user can manager an organization
     */
    hasOrganizations() {
        return this.userService.getMe() && this.userService.getMe().organization_managers.length > 0;
    }

    /**
     * Asks the user what organization they want to access
     */
    openOrganizationDialogue() {
        const organizationManagers = this.userService.getMe().organization_managers;

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
    goToOrganization(organization: Organization) {
        this.menuCtl.close('side-menu').catch(console.error);
        this.navCtl.navigateRoot('/organization-dashboard/' + organization.id).catch(console.error);
    }

    /**
     * Handles the logout properly
     */
    handleLogout() {
        AppComponent.LOGGED_IN = false;
        this.menuCtl.close('side-menu').catch(console.error);
        this.storage.logOut().catch(console.error);
        this.navCtl.navigateRoot('/sign-in').catch(console.error);
    }
}
