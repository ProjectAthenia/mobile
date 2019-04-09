import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInHeaderComponent } from './logged-in-header.component';
import {CommonModule} from "@angular/common";
import {AlertController, IonicModule, NavController, Platform} from '@ionic/angular';
import {RequestsProvider} from "../../providers/requests/requests";
import RequestsProviderMock from "../../providers/requests/requests.mock";

describe('LoggedInHeaderComponent', () => {
    let component: LoggedInHeaderComponent;
    let fixture: ComponentFixture<LoggedInHeaderComponent>;
    let navController;
    let alertController;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController(window.document);
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: Platform, useValue: new Platform(window.document)},
            ],
            declarations: [
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
