import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {InsertShadowModule} from './shared/insert-shadow/insert-shadow.module';
import {NotFoundModule} from './pages/not-found/not-found.module';
import {BaseUrlInterceptor} from './shared/base-url/base-url.interceptor';

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
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseUrlInterceptor,
            multi: true,
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ErrorInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: MapInterceptor,
        //     multi: true,
        // },
        // {
        //     provide: NAME_TOKEN,
        //     useValue: 'AppModule',
        // },
    ],
    /**
     * request - base request
     *
     * BaseUrlInterceptor.intercept(request, handler) -> ErrorInterceptor.intercept(baseRequest) -> MapInterceptor.intercept(errorRequest) -> mapRequest
     *
     * (BaseUrlInterceptor) handle(patchedRequest) === ErrorInterceptor.intercept(patchedRequest)
     */
    bootstrap: [AppComponent],
})
export class AppModule {}

//                                      NullInjector

//                                          |

//                                    PlatformInjector

//                                          |

//                              RootInjector(AppModuleInjector)

// -------------------------------------------------------------------------------------------

//                          /                               \

//             ProductsListModuleInjector          ProductModuleInjector

// -------------------------------------------------------------------------------------------

//                                           |

//                                     AppElementIjector
//                                                        \_________
//                                           |                      \

//                                  SidenavElementInjector           HeaderElementInjector

//                              /                             \

//           ProductsListElementInjector              ProductElementInjector

//                      |

//             CardElementInjectore
