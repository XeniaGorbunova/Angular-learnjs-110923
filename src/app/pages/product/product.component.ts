import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, map, switchMap, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
    readonly product$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(Boolean),
        tap(productId => {
            this.productsStoreService.loadProduct(productId);
        }),
        switchMap(() => this.productsStoreService.currentProduct$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        // eslint-disable-next-line no-console
        console.log(
            'ProductComponent constructor init',
            this.activatedRoute.snapshot.paramMap.get('id'),
        );
        // console.log(
        //     this.activatedRoute.snapshot.pathFromRoot
        //         .map(({url}) => url.map(({path}) => path).join('/'))
        //         .join('/'),
        // );

        setTimeout(() => {
            this.router.navigate(['/', 'product', 'portativnaa-kolonka-huawei-cm510-cernyj']);
        }, 3000);
    }

    onNavigateToTab(tab: 'description' | 'type') {
        // this.router.navigate([`./${tab}`], {relativeTo: this.activatedRoute});

        const urlTree = this.router.createUrlTree([`./${tab}`], {relativeTo: this.activatedRoute});

        // eslint-disable-next-line no-console
        console.log(urlTree.toString());

        this.router.navigateByUrl(urlTree);
    }
}
