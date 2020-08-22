import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CommonModule} from "@angular/common";
import {AlertController, IonicModule, NavController} from "@ionic/angular";
import {MenuButtonWithNotificationsComponent} from './menu-button-with-notifications.component';

describe('MenuButtonWithNotificationsComponent', () => {
  let component: MenuButtonWithNotificationsComponent;
  let fixture: ComponentFixture<MenuButtonWithNotificationsComponent>;
  let navController;
  let alertController;

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
        ],
        declarations: [
            MenuButtonWithNotificationsComponent,
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonWithNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
