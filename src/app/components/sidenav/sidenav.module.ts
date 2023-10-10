import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {SidenavComponent} from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, MatButtonModule],
    // providers: [
    //     // ...CommonModule.providers,
    //     {
    //         provide: NAME_TOKEN,
    //         useValue: 'SidenavModule',
    //     },
    // ],
    exports: [SidenavComponent],
})
export class SidenavModule {}
