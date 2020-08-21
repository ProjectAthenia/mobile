import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPage } from './thread.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('ThreadPage', () => {
    let component: ThreadPage;
    let navController;
    let fixture: ComponentFixture<ThreadPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const fireBase: FirebaseX = new FirebaseX();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['back']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            thread_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                ThreadPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                { provide: ToastController, useValue: new ToastController()},
                { provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
                { provide: FirebaseX, useValue: fireBase},
                { provide: Router, useValue: {}},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreadPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
