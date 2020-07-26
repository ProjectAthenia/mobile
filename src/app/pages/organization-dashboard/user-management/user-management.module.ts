import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {UserManagementPage} from './user-management.page';
import {ComponentsModule} from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: UserManagementPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [UserManagementPage]
})
export class UserManagementPageModule {}
