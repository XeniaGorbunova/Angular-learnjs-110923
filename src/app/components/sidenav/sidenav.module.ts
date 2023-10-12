import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidenavComponent} from './sidenav.component';
import {CategoriesSelectModule} from './categories-select/categories-select.module';

@NgModule({
    declarations: [SidenavComponent],
    imports: [CommonModule, MatSidenavModule, CategoriesSelectModule],
    exports: [SidenavComponent],
})
export class SidenavModule {}
