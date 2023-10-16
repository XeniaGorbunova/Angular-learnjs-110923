import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // providers: [
    //     {
    //         provide: NAME_TOKEN,
    //         useValue: 'ProductsListComponent',
    //     },
    // ],
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );
    // readonly products$ = this.activatedRoute.data.pipe(
    //     tap(console.log),
    //     map(({products}) => products as IProduct[]),
    // );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute, // @Inject(NAME_TOKEN) @SkipSelf() name: string,
    ) {
        // eslint-disable-next-line no-console
        // console.log('ProductsListComponent', name);
        // console.log('ProductsListComponent');
    }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }
}
