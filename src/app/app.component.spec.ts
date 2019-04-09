import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Events, MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { StorageProvider } from './providers/storage/storage';
import { EventsMock } from '../../test-config/mocks-ionic';
import { NativeStorageMock } from '../../test-config/mocks/plugins';

describe('AppComponent', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
    let resolveSpy;
    let storageProvider;
    let menuController;
    let navController;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        resolveSpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
        storageProvider = new StorageProvider(new NativeStorageMock());
        menuController = jasmine.createSpyObj('MenuController', ['close']);
        navController = jasmine.createSpyObj('NavController', {navigateRoot: resolveSpy});
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
                { provide: Events, useValue: new EventsMock()},
                { provide: StorageProvider, useValue: storageProvider},
                { provide: MenuController, useValue: menuController },
                { provide: NavController, useValue: navController },
            ],
            imports: [ RouterTestingModule.withRoutes([])],
        }).compileComponents();
    }));

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should have menu labels', async () => {
        const fixture = await TestBed.createComponent(AppComponent);
        await fixture.detectChanges();
        const app = fixture.nativeElement;
        const menuItems = app.querySelectorAll('ion-label');
        expect(menuItems[0].textContent).toContain('Home');
    });

});
