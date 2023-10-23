import {IProduct} from '../../shared/products/product.interface';

export const PRODUCTS_FEATURE = 'products';

export interface IProductsState {
    data: IProduct[] | null;
    priceRange: {
        min: number;
        max: number;
    };
}

export const productsInitialState: IProductsState = {
    data: null,
    priceRange: {
        min: 0,
        max: 999999,
    },
};
