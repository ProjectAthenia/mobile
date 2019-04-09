import { Component } from '@angular/core';

import {Events, MenuController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {StorageProvider} from './providers/storage/storage';
import {environment} from '../environments/environment';

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
     * @param events
     * @param navCtl
     * @param menuCtl
     * @param storage
     */
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private events: Events,
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
            this.events.subscribe('logout', this.handleLogout.bind(this));
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
        this.navCtl.navigateBack(page).catch(console.error);
    }

    /**
     * Whether or not the user is logged in
     * This is used for component binding
     */
    isLoggedIn() {
        return AppComponent.LOGGED_IN;
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
