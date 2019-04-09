import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutHeaderComponent } from './logged-out-header.component';
import { CommonModule } from "@angular/common";
import { AlertController, IonicModule, NavController } from "@ionic/angular";

describe('LoggedOutHeaderComponent', () => {
    let component: LoggedOutHeaderComponent;
    let fixture: ComponentFixture<LoggedOutHeaderComponent>;
    let navController;
    let alertController;

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
            ],
            declarations: [
                LoggedOutHeaderComponent,
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoggedOutHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
