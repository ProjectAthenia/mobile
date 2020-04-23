import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditorPage } from './profile-editor.page';
import {ReactiveFormsModule} from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import {ComponentsModule} from '../../components/components.module';
import {NavController, ToastController} from '@ionic/angular';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';

describe('ProfileEditorPage', () => {
    let component: ProfileEditorPage;
    let navController;
    let fixture: ComponentFixture<ProfileEditorPage>;
    const requestsProvider: RequestsProvider = new RequestsProviderMock();
    const camera: Camera = new Camera();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileEditorPage,
            ],
            imports: [
                ReactiveFormsModule,
                ComponentsModule,
            ],
            providers: [
                { provide: ToastController, useValue: new ToastController()},
                { provide: NavController, useValue: navController},
                { provide: RequestsProvider, useValue: requestsProvider},
                { provide: Camera, useValue: camera },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileEditorPage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
