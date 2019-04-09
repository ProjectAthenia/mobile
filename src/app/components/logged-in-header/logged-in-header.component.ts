import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { RequestsProvider } from '../../providers/requests/requests';

@Component({
    selector: 'app-logged-in-header',
    templateUrl: './logged-in-header.component.html',
    styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent implements OnInit {

    /**
     * The header for this page
     */
    @ViewChild('header')
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
     * Default Constructor
     * @param requests
     * @param navController
     * @param platform
     */
    constructor(
        private requests: RequestsProvider,
        private navController: NavController,
        private platform: Platform
    ) {}

    /**
     * Checks whether or not this is running on android
     */
    ngOnInit(): void {
        this.platform.ready().then(() => {
            this.isAndroid = this.platform.is('android');
        });
    }

    /**
     * Goes to the home page
     */
    goHome() {
        this.navController.navigateBack('home').catch(console.error);
    }

    /**
     * Determines whether or not we want to show the branding in the header
     */
    showBranding() {
        return this.isHome || this.isAndroid;
    }
}
