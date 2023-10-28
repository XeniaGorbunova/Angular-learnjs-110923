import {IProductsFilter} from '../filter/products-filter.interface';
import {ProductsFilterQueryParams} from './products-filter-query-params.interface';

export function getQueryParamsFromFilter(filter: IProductsFilter): ProductsFilterQueryParams {
    return {
        name: filter.name || undefined,
        brands: filter.brands.length ? filter.brands.join(',') : undefined,
        minPrice: filter.priceRange.min.toString(),
        maxPrice: filter.priceRange.max.toString(),
    };
}
