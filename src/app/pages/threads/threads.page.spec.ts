import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadsPage } from './threads.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('ThreadsPage', () => {
    let component: ThreadsPage;
    let navController;
    let fixture: ComponentFixture<ThreadsPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['navigateRoot']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                ThreadsPage,
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
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThreadsPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
