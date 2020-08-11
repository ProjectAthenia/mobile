import { Component } from '@angular/core';
import CanBeHomePage from '../can-be-home.page';
import {Platform} from '@ionic/angular';
import {StorageProvider} from '../../providers/storage/storage';
import {ActivatedRoute} from '@angular/router';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends CanBeHomePage
{
    /**
     * Default constructor
     * @param platform
     * @param storage
     */
    constructor(protected platform: Platform,
                protected storage: StorageProvider)
    {
        super(platform, storage);
    }
}
