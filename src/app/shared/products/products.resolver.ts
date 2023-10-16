import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, delay, filter} from 'rxjs';
import {ProductsStoreService} from './products-store.service';
import {IProduct} from './product.interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsResolver implements Resolve<IProduct[]> {
    constructor(private readonly productsStoreService: ProductsStoreService) {}

    resolve(
        {paramMap}: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
    ): Observable<IProduct[]> {
        this.productsStoreService.loadProducts(paramMap.get('subCategoryId'));

        return this.productsStoreService.products$.pipe(filter(Boolean), delay(4000));
    }
}
