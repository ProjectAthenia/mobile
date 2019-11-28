import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditorComponent } from './article-editor.component';
import {CommonModule} from "@angular/common";
import {AlertController, IonicModule, NavController, Platform} from '@ionic/angular';
import {PlatformMock} from '../../../../test-config/mocks-ionic';

describe('ArticleEditorComponent', () => {
    let component: ArticleEditorComponent;
    let fixture: ComponentFixture<ArticleEditorComponent>;
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
                {provide: NavController, useValue: navController},
                { provide: Platform, useValue: new PlatformMock()},
            ],
            declarations: [
                ArticleEditorComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
