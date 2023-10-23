import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {InsertShadowModule} from './shared/insert-shadow/insert-shadow.module';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';
import {storeReducer} from './store/reducer';
import {environment} from '../environments/environment';

const devtoolsInstruments = [];

if (!environment.isProd) {
    devtoolsInstruments.push(StoreDevtoolsModule.instrument());
}

@NgModule({
    declarations: [AppComponent],
    exports: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        NotFoundModule,
        SidenavModule,
        MatListModule,
        PopupHostModule,
        InsertShadowModule,
        HttpClientModule,
        StoreModule.forRoot(storeReducer),
        ...devtoolsInstruments,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
