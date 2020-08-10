import {BasePage} from './base.page';
import {StorageProvider} from '../providers/storage/storage';
import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Platform} from '@ionic/angular';

/**
 * Make all pages extend this if they are capable of being the home page
 * When the app opens freshly, the user will be taken to the last page that extends this class
 */
export default abstract class CanBeHomePage extends BasePage implements OnInit
{
    /**
     * Default constructor
     * @param platform
     * @param storage
     * @param route
     */
    protected constructor(protected platform: Platform,
                          protected storage: StorageProvider,
                          protected route: ActivatedRoute)
    {
        super();
    }

    /**
     * Saves the current route as the default home page
     */
    ngOnInit(): void
    {
        this.platform.ready().then(() => {
            const route = this.route.toString();
            console.log(route);
        });
    }
}