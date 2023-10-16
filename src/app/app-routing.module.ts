import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products-list',
    },
    {
        path: 'products-list',
        // children: productsListRoutes,
        loadChildren: () =>
            import('./pages/products-list/products-list.module').then(m => m.ProductsListModule),
        // canActivate: [
        //     (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) =>
        //         question('Можно ли перейти по пути?'),
        // ],
        // canActivate: [
        //     (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        //         inject(QuestionCanActivateGuard).canActivate(route, state),
        // ],
        // canLoad: [QuestionCanLoadGuard],
        // canMatch: [QuestionCanMatchGuard],
    },
    // {
    //     path: 'products-list',
    //     // children: productsListRoutes,
    // },
    {
        path: 'product/:id',
        // children: productRoutes,
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        // canLoad: [QuestionCanLoadGuard],
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
