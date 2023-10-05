import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {productsMock} from './products.mock';

@Injectable()
export class ProductsStoreService {
    private readonly productsStore$ = new BehaviorSubject<IProduct[] | null>(null);

    get products$(): Observable<IProduct[] | null> {
        return this.productsStore$.asObservable();
    }

    loadProducts() {
        setTimeout(() => {
            this.productsStore$.next(productsMock);
        }, 2000);
    }
}
