import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonTabs, Platform} from '@ionic/angular';
import CanBeHomePage from '../can-be-home.page';
import {StorageProvider} from '../../providers/storage/storage';

@Component({
    selector: 'app-organization-dashboard',
    templateUrl: './organization-dashboard.page.html',
    styleUrls: ['./organization-dashboard.page.scss']
})
export class OrganizationDashboardPage extends CanBeHomePage implements OnInit {

    /**
     * The message input
     */
    @ViewChild('tabs', {static: false})
    tabs: IonTabs;

    /**
     * The id of the organization
     */
    organizationId: number;

    /**
     * Default Constructor
     * @param platform
     * @param storage
     * @param route
     */
    constructor(protected platform: Platform,
                protected storage: StorageProvider,
                protected route: ActivatedRoute) {
        super(platform, storage);
        this.organizationId = parseInt(this.route.snapshot.paramMap.get('organization_id'), 0);
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void {
        super.ngOnInit();
        setTimeout(() => {
            this.tabs.select('user-management/' + this.organizationId).catch(console.error);
        }, 50);
    }
}
