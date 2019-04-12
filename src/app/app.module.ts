import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RequestHandlerProvider } from './providers/request-handler/request-handler';
import { StorageProvider } from './providers/storage/storage';
import { AuthManagerProvider } from './providers/auth-manager/auth-manager';
import { RequestsProvider } from './providers/requests/requests';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

        // Plugin Providers
        HTTP,
        NativeStorage,
        Stripe,

        // App providers
        RequestHandlerProvider,
        StorageProvider,
        AuthManagerProvider,
        RequestsProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
