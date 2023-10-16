import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IProduct} from './product.interface';
import {IProductsDto} from './products.dto';
import {IProductDto} from './product.dto';
import {getParamsFromObject} from '../params/get-params-from-object';

@Injectable({providedIn: 'root'})
export class ProductsApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getProducts$(subCategoryId?: string | null): Observable<IProduct[]> {
        return this.httpClient
            .get<IProductsDto>(`/products`, {
                params: getParamsFromObject({subCat: subCategoryId}),
            })
            .pipe(map(({data}) => data.items));
    }

    getProduct$(id: string): Observable<IProduct | undefined> {
        return this.httpClient.get<IProductDto>(`/products/${id}`).pipe(map(({data}) => data));
    }
}
