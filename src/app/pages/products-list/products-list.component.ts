import {Component} from '@angular/core';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    // encapsulation: ViewEncapsulation.Emulated,
})
export class ProductsListComponent {
    readonly productList = productsMock;
    cartList: string[] = [];

    onCardClick() {
        // eslint-disable-next-line no-console
        // console.log('Card click');
    }

    trackByProduct(index: number, product: any): number {
        return product._id;
    }

    handleProductBuyClick(productId: string) {
        this.cartList = [...this.cartList, productId];
        // console.log(this.cartList);
    }
}
