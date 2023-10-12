import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {baseUrl} from '../base-url/base-url.const';
import {IProductsDto} from './products.dto';
import {IProductDto} from './product.dto';

@Injectable({providedIn: 'root'})
export class ProductsApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getProducts$(): Observable<IProduct[]> {
        return this.httpClient
            .get<IProductsDto>(`${baseUrl}/products`)
            .pipe(map(({data}) => data.items));
    }

    getProduct$(id: string): Observable<IProduct | undefined> {
        return this.httpClient
            .get<IProductDto>(`${baseUrl}/products/${id}`)
            .pipe(map(({data}) => data));
    }
}
