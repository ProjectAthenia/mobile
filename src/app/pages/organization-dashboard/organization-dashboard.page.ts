import {Component, OnInit, ViewChild} from '@angular/core';
import {BasePage} from '../base.page';
import {ActivatedRoute} from '@angular/router';
import {IonTabs} from '@ionic/angular';

@Component({
    selector: 'app-organization-dashboard',
    templateUrl: './organization-dashboard.page.html',
    styleUrls: ['./organization-dashboard.page.scss']
})
export class OrganizationDashboardPage extends BasePage implements OnInit {

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
     * @param route
     */
    constructor(private route: ActivatedRoute) {
        super();
        this.organizationId = parseInt(this.route.snapshot.paramMap.get('organization_id'), 0);
    }

    /**
     * Takes us to the default tab
     */
    ngOnInit(): void {
        setTimeout(() => {
            this.tabs.select('user-management/' + this.organizationId).catch(console.error);
        }, 50);
    }
}
