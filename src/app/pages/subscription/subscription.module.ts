import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {CardModule} from 'ngx-card/ngx-card';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {SubscriptionPage} from './subscription.page';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        CardModule,
    ],
    declarations: [SubscriptionPage]
})
export class SubscriptionPageModule {}
