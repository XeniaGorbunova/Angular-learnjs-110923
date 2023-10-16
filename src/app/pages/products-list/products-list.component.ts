import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }

    onNavigateToProduct() {
        // this.router.navigate(['product', 'id']);
        this.router.navigateByUrl('product/id');
    }
}
