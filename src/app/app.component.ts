import { Component } from '@angular/core';
import {MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageProvider} from './providers/storage/storage';
import {environment} from '../environments/environment';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';

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
     * @param menuCtl
     * @param storage
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authManagerService: AuthManagerService,
        private navCtl: NavController,
        private menuCtl: MenuController,
        private storage: StorageProvider,
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
     * Handles the logout properly
     */
    handleLogout() {
        AppComponent.LOGGED_IN = false;
        this.menuCtl.close('side-menu').catch(console.error);
        this.storage.logOut().catch(console.error);
        this.navCtl.navigateRoot('/sign-in').catch(console.error);
    }
}
