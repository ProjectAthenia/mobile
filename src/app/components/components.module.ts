import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {LoggedOutHeaderComponent} from './logged-out-header/logged-out-header.component';
import {LoggedInHeaderComponent} from './logged-in-header/logged-in-header.component';
import {RouterModule} from '@angular/router';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';
import {OrganizationUsersManagementComponent} from './organization-users-management/organization-users-management.component';
import {MenuComponent} from './menu/menu.component';
import {MenuButtonWithNotificationsComponent} from './menu-button-with-notifications/menu-button-with-notifications.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        MenuComponent,
        OrganizationUsersManagementComponent,
        RatingBarComponent,
        MenuButtonWithNotificationsComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        MenuComponent,
        OrganizationUsersManagementComponent,
        RatingBarComponent,
    ],
})
export class ComponentsModule {}
