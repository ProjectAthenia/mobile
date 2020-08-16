import { Component } from '@angular/core';
import {AlertController, MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageProvider} from './providers/storage/storage';
import {environment} from '../environments/environment';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {UserService} from './services/user.service';
import {User} from './models/user/user';
import {OrganizationService} from './services/organization.service';

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
     * The logged in user
     */
    me: User;

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
     * @param organizationService
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
        private organizationService: OrganizationService,
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
            this.storage.loadAuthToken()
            .then(() => {
                this.userService.getMe().then(user => {
                    this.me = user;
                    AppComponent.LOGGED_IN = true;
                    this.storage.loadDefaultHomePage().then(page => {
                        this.navCtl.navigateRoot(page.length ? page : '/home').catch(console.error);
                    }).catch(() => {
                        this.navCtl.navigateRoot('/home').catch(console.error);
                    });
                });
            }).catch(() => {
                if (environment.sign_up_enabled) {
                    this.navCtl.navigateRoot('/sign-up').catch(console.error);
                } else {
                    this.navCtl.navigateRoot('/sign-in').catch(console.error);
                }
            });
        });
    }

    /**
     * Whether or not the user is logged in
     * This is used for component binding
     */
    isLoggedIn()
    {
        return AppComponent.LOGGED_IN;
    }
}
