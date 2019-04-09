import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPage } from './sign-in.page';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";
import {StorageProvider} from "../../providers/storage/storage";
import {RequestsProvider} from "../../providers/requests/requests";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import RequestsProviderMock from "../../providers/requests/requests.mock";
import {NavController} from "@ionic/angular";

describe('SignInPage', () => {
    let component: SignInPage;
    let navController;
    let fixture: ComponentFixture<SignInPage>;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        TestBed.configureTestingModule({
            declarations: [
                SignInPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                NativeStorage,
                StorageProvider,
                FormBuilder,
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: NavController, useValue: navController},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
