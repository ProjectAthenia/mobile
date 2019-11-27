import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPage } from './user.page';
import {ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';

describe('UserPage', () => {
    let component: UserPage;
    let navController;
    let fixture: ComponentFixture<UserPage>;
    let activatedRoute;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const file: File = new File();
    const fileOpener: FileOpener = new FileOpener();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['navigateBack']);
        activatedRoute = {};
        activatedRoute.snapshot = {};
        activatedRoute.snapshot.paramMap = convertToParamMap({
            user_id: 1234
        });
        TestBed.configureTestingModule({
            declarations: [
                UserPage,
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
                {provide: File, useValue: file},
                {provide: FileOpener, useValue: fileOpener},
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        const getMeSubscription = spyOn(requestsProvider.social, 'loadUser');
        getMeSubscription.and.returnValue(Promise.reject());
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
