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
    // Add more pages below
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
