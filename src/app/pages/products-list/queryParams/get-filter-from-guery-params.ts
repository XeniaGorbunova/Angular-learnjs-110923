import {ProductsFilterQueryParams} from './products-filter-query-params.interface';
import {IProductsFilter} from '../filter/products-filter.interface';

export function getFilterFromQueryParams({
    name,
    brands,
    minPrice: min,
    maxPrice: max,
}: ProductsFilterQueryParams): IProductsFilter {
    return {
        name: name || '',
        brands: brands?.length ? brands.split(',') : [],
        priceRange: {
            min: +min || 1,
            max: +max || 99999,
        },
    };
}
