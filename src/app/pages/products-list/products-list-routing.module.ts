import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';

export const productsListRoutes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
    },
    {
        path: ':subCategoryId',
        component: ProductsListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(productsListRoutes)],
    exports: [RouterModule],
})
export class ProductsListRoutingModule {}
