import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
    standalone: true,
})
export class ProductsFilterPipe implements PipeTransform {
    transform(products: IProduct[], searchName: string): IProduct[] | null {
        return products.filter(product => {
            return product.name.includes(searchName);
        });
    }
}
