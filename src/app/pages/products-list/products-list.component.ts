import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, Subject, switchMap, take, takeUntil, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {IProductsFilter} from './filter/products-filter.interface';
import {getQueryParamsFromFilter} from './queryParams/get-query-params -from-filter';
import {ProductsFilterQueryParams} from './queryParams/products-filter-query-params.interface';
import {getFilterFromQueryParams} from './queryParams/get-filter-from-guery-params';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    private destroy$ = new Subject<void>();
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

    readonly searchName$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('name')),
        takeUntil(this.destroy$),
    );

    readonly initialFiltersValue$ = this.activatedRoute.queryParams.pipe(
        take(1),
        map(queryParams => getFilterFromQueryParams(queryParams as ProductsFilterQueryParams)),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
    ) {}

    onDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }

    onFilterChange(filter: IProductsFilter) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: getQueryParamsFromFilter(filter),
            queryParamsHandling: 'merge',
        });
    }
}
