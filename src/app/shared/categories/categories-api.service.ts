import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ICategory} from './category.interface';
import {baseUrl} from '../base-url/base-url.const';

@Injectable({
    providedIn: 'root',
})
export class CategoriesApiService {
    constructor(private readonly http: HttpClient) {}

    loadCategories$(): Observable<ICategory[]> {
        return this.http
            .get<{data: ICategory[]}>(`${baseUrl}/categories`)
            .pipe(map(({data}) => data));
    }
}
