import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPage } from './subscription.page';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {CardModule} from 'ngx-card';
import {Stripe} from '@ionic-native/stripe/ngx';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('SubscriptionPage', () => {
    let component: SubscriptionPage;
    let navController;
    let fixture: ComponentFixture<SubscriptionPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['navigateBack']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                SubscriptionPage,
            ],
            imports: [
                FormsModule,
                ComponentsModule,
                CardModule,
            ],
            providers: [
                { provide: AlertController, useValue: new AlertController()},
                { provide: ToastController, useValue: new ToastController()},
                { provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: ActivatedRoute, useValue: activatedRoute},
                { provide: Stripe, useValue: new Stripe() },
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
