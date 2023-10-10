import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    Optional,
    Self,
    SkipSelf,
} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {NAME_TOKEN} from '../../shared/test-token/name.token';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NAME_TOKEN,
            useValue: 'ProductsListComponent',
        },
    ],
})
export class ProductsListComponent implements OnInit {
    // private readonly productsStoreService = new ProductsStoreService(
    //     new HttpService(),
    //     new UserService(),
    // );

    // products$: Observable<IProduct[]> = of(productsMock);
    readonly products$ = this.productsStoreService.products$;

    // constructor(private readonly productsStoreService: ProductsStoreService) {}
    constructor(
        // @Inject(ProductsStoreService) private readonly productsStoreService: ProductsStoreService,
        private readonly productsStoreService: ProductsStoreService,
        // @Inject('ProductsStore')
        // private readonly productsStoreServiceString: ProductsStoreService,
        // @Inject('products') readonly products$: Observable<IProduct[] | null>,
        @Inject(NAME_TOKEN) @Optional() @SkipSelf() private readonly parentName: string | null, // @Inject('userAge') private readonly userAge: number,
        @Inject(NAME_TOKEN) @Optional() @Self() private readonly name: string | null, // @Inject('userAge') private readonly userAge: number,
    ) {
        // eslint-disable-next-line no-console
        console.log(this.name, this.parentName);
        // console.log(
        //     this.productsStoreService,
        //     this.productsStoreServiceString,
        //     this.productsStoreService === this.productsStoreServiceString,
        // );

        // this.name = 'Slava';
    }

    ngOnInit() {
        // console.log(this.name);
        this.productsStoreService.loadProducts();
    }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }
}
