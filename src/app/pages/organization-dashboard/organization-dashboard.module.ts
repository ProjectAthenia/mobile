import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {ComponentsModule} from '../../components/components.module';
import {OrganizationDashboardPage} from './organization-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDashboardPage,
    children: [
      {
        path: 'user-management/:organization_id',
        children: [
          {
            path: '',
            loadChildren: './user-management/user-management.module#UserManagementPageModule'
          }
        ]
      },
    ]
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
  declarations: [OrganizationDashboardPage]
})
export class OrganizationDashboardPageModule {}
