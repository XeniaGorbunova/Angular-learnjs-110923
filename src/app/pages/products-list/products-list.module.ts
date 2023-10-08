import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {DumpNgIfModule} from '../../shared/dump-ng-if/dump-ng-if.module';
import {PaginationModule} from '../../shared/pagination/pagination.module';
import {MyAsyncModule} from '../../shared/my-async/my-async.module';
import {ProductsFilterPipe} from '../../shared/products-filter/products-filter.pipe';
import {FilterByPropertyPipe} from '../../shared/filter-by-property/filter-by-property.pipe';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CommonModule,
        CardModule,
        DumpNgIfModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        PaginationModule,
        MyAsyncModule,
        ProductsFilterPipe,
        FilterByPropertyPipe,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
