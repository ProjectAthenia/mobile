import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {LoggedOutHeaderComponent} from './logged-out-header/logged-out-header.component';
import {LoggedInHeaderComponent} from './logged-in-header/logged-in-header.component';
import {RouterModule} from '@angular/router';
import {RatingBarComponent} from './rating-bar/rating-bar.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterModule,
    ],
    declarations: [
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
    ],
    exports: [
        LoggedInHeaderComponent,
        LoggedOutHeaderComponent,
        RatingBarComponent,
    ],
})
export class ComponentsModule {}
