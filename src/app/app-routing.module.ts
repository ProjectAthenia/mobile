import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule'
    },
    {
        path: 'organization-creation',
        loadChildren: './pages/organization-creation/organization-creation.module#OrganizationCreationPageModule'
    },
    {
        path: 'organization-dashboard/:organization_id',
        loadChildren: './pages/organization-dashboard/organization-dashboard.module#OrganizationDashboardPageModule'
    },
    {
        path: 'profile-editor',
        loadChildren: './pages/profile-editor/profile-editor.module#ProfileEditorPageModule'
    },
    {
        path: 'sign-in',
        loadChildren: './pages/sign-in/sign-in.module#SignInPageModule'
    },
    {
        path: 'sign-up',
        loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule'
    },
    {
        path: 'subscription',
        loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule'
    },
    {
        path: 'subscription/:feature_id',
        loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule'
    },
    {
        path: 'threads',
        loadChildren: './pages/threads/threads.module#ThreadsPageModule',
    },
    {
        path: 'user/:user_id',
        loadChildren: './pages/user/user.module#UserPageModule',
    },
    {
        path: 'contacts',
        loadChildren: './pages/contacts/contacts.module#ContactsPageModule',
    },
    {
        path: 'user/:user_id/message',
        loadChildren: './pages/thread/thread.module#ThreadPageModule',
    },
    // Add more pages below
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
