import {BehaviorSubject, Observable, filter} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable({providedIn: 'root'})
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);
    private readonly currentProductStore$ = new BehaviorSubject<IProduct | null>(null);

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    get currentProduct$(): Observable<IProduct | null> {
        return this.currentProductStore$.asObservable();
    }

    constructor(private readonly productsApiService: ProductsApiService) {}

    loadProducts() {
        this.productsApiService.getProducts$().subscribe(products => {
            this.productsStore$.next(products);
        });
    }

    loadProduct(productId: string) {
        const productPreview = this.productsStore$.value?.find(({_id}) => _id === productId);

        this.currentProductStore$.next(productPreview || null);

        this.productsApiService
            .getProduct$(productId)
            .pipe(filter(Boolean))
            .subscribe(product => {
                this.currentProductStore$.next(product);
            });
    }
}
