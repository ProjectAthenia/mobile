import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {MenuComponent} from './menu.component';
import {RequestsProvider} from '../../providers/requests/requests';
import RequestsProviderMock from '../../providers/requests/requests.mock';
import {StorageProvider} from '../../providers/storage/storage';
import {NativeStorageMock} from '../../../../test-config/mocks/plugins';
import {AppComponent} from '../../app.component';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
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
                {provide: StorageProvider, useValue: new StorageProvider(new NativeStorageMock())},
            ],
            declarations: [
                MenuComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have menu labels', async () => {
        const app = fixture.nativeElement;
        const menuItems = app.querySelectorAll('ion-label');
        expect(menuItems[0].textContent).toContain('Home');
    });
});
