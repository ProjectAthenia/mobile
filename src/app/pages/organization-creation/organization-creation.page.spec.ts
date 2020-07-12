import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsingDeliveriesPage } from './delivery.page';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {AvailableRequestInfoWindowComponent} from '../../components/available-request-info-window/available-request-info-window.component';
import {DeliveryMapComponent} from '../../components/map/delivery-map/delivery-map.component';
import {OrganizationCreationPage} from './organization-creation.page';

describe('OrganizationCreationPage', () => {
    let component: OrganizationCreationPage;
    let fixture: ComponentFixture<OrganizationCreationPage>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                {provide: Geolocation, useValue: new Geolocation()},
                { provide: RequestsProvider, useValue: requestsProvider},
            ],
            declarations: [
                AvailableRequestInfoWindowComponent,
                DeliveryMapComponent,
                BrowsingDeliveriesPage,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrowsingDeliveriesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
