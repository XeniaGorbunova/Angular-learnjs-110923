import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {ProductComponent} from './pages/product/product.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DescriptionComponent} from './pages/product/description/description.component';
import {TypeComponent} from './pages/product/type/type.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products-list',
    },
    {
        path: 'products-list', // ['products-list']
        component: ProductsListComponent,
    },
    {
        path: 'products-list/:subCategoryId',
        component: ProductsListComponent,
    },
    // { old config
    //     path: ':id/root',
    //     redirectTo: 'root/:id',
    // },
    // { new config
    //     path: 'root/:id',
    //     component: ...,
    // },
    {
        path: 'product/:id', // ['product', 'id']
        component: ProductComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'description',
            },
            {
                path: 'description', // ['description']
                component: DescriptionComponent,
            },
            {
                path: 'type', // ['type']
                component: TypeComponent,
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

// search indexes: 0 -> 1 -> 2 -> ...

// current url segments: ['product', 'id', '']

//                                                         undefined
//        __
//      /                                /                     |                     \

//  ['']                ['products-list']               ['product', 'id']             ['**']
//                                  ________________/
//                                 /                     /               \

//                            ['']        ['description']                ['type']
