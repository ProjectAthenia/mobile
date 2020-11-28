import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";
import {SubscriptionUpgradeRequiredWindowComponent} from './subscription-upgrade-required-window.component';
import {OverlayWindowComponent} from '../overlay-window/overlay-window.component';
import {RouterModule} from '@angular/router';

describe('SubscriptionUpgradeRequiredWindowComponent', () => {
    let component: SubscriptionUpgradeRequiredWindowComponent;
    let fixture: ComponentFixture<SubscriptionUpgradeRequiredWindowComponent>;
    let navController;
    let alertController;

    beforeEach(async(() => {
        navController = jasmine.createSpyObj('NavController', ['goBack']);
        alertController = new AlertController();
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterModule,
                IonicModule.forRoot(),
            ],
            providers: [
                {provide: AlertController, useValue: alertController},
                {provide: NavController, useValue: navController},
            ],
            declarations: [
                OverlayWindowComponent,
                SubscriptionUpgradeRequiredWindowComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionUpgradeRequiredWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
