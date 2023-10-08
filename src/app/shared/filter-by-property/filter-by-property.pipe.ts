import {Pipe, PipeTransform} from '@angular/core';
import {IProduct} from '../products/product.interface';

@Pipe({
    name: 'filterByProperty',
    standalone: true,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<TKey extends keyof IProduct>(
        products: IProduct[],
        propertyName: TKey,
        searchPropertyValue: IProduct[TKey],
    ): IProduct[] | null {
        return products.filter(product => {
            if (typeof product[propertyName] === 'string') {
                return (product[propertyName] as string).includes(searchPropertyValue as string);
            } else {
                return product[propertyName] === searchPropertyValue;
            }
        });
    }
}
