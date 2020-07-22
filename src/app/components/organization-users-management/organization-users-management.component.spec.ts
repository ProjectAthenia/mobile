import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUsersManagementComponent } from './logged-in-header.component';
import {CommonModule} from "@angular/common";
import {AlertController, IonicModule, NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from "../../providers/requests/requests";
import RequestsProviderMock from "../../providers/requests/requests.mock";
import {PlatformMock} from '../../../../test-config/mocks-ionic';

describe('LoggedInHeaderComponent', () => {
    let component: OrganizationUsersManagementComponent;
    let fixture: ComponentFixture<OrganizationUsersManagementComponent>;
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
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: Platform, useValue: new PlatformMock()},
            ],
            declarations: [
                OrganizationUsersManagementComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrganizationUsersManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
