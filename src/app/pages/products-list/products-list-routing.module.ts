import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {ProductsResolver} from '../../shared/products/products.resolver';

export const productsListRoutes: Routes = [
    {
        path: '',
        component: ProductsListComponent,
        resolve: {
            products: ProductsResolver,
        },
    },
    {
        path: ':subCategoryId',
        component: ProductsListComponent,
        resolve: {
            products: ProductsResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(productsListRoutes)],
    exports: [RouterModule],
})
export class ProductsListRoutingModule {}
