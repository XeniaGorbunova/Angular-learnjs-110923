import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {ProductsApiService} from './products-api.service';

@Injectable({
    providedIn: 'root',
})
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    constructor(private readonly productsApiService: ProductsApiService) {}

    loadProducts() {
        // setTimeout(() => {
        //     this.productsStore$.next(productsMock);
        // }, 2000);
        this.productsApiService.getProducts$().subscribe(value => {
            this.productsStore$.next(value);
        });
    }
}
