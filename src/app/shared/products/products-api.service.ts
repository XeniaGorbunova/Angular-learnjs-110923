import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {baseUrl} from '../base-url/base-url.const';

@Injectable({
    providedIn: 'root',
})
export class ProductsApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getProducts$(): Observable<IProduct[]> {
        // return of({data: {items: productsMock}}).pipe(map(({data}) => data.items));
        return this.httpClient
            .get<{data: {items: IProduct[]}}>(`${baseUrl}/products/suggestion`)
            .pipe(map(({data}) => data.items));
    }
}
