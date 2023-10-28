import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';

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

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.brandsService.loadBrands(subCategoryId);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    filterName = '';

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
    ) {}

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }

    setFilterName(filterName: string) {
        this.filterName = filterName;
    }
}
