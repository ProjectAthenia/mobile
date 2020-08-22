import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInHeaderComponent } from './logged-in-header.component';
import {CommonModule} from "@angular/common";
import {AlertController, IonicModule, NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from "../../providers/requests/requests";
import RequestsProviderMock from "../../providers/requests/requests.mock";
import {PlatformMock} from '../../../../test-config/mocks-ionic';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {MenuButtonWithNotificationsComponent} from '../menu-button-with-notifications/menu-button-with-notifications.component';

describe('LoggedInHeaderComponent', () => {
    let component: LoggedInHeaderComponent;
    let fixture: ComponentFixture<LoggedInHeaderComponent>;
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
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
            ],
            declarations: [
                MenuButtonWithNotificationsComponent,
                LoggedInHeaderComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoggedInHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
