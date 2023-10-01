import {Component, OnInit} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';
import {LoadDirection} from 'src/app/shared/infinit-scroll/infinit-scroll';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
    productsStore: IProduct[] | null = null;

    get products(): IProduct[] | null {
        // console.log('Calculated');

        return this.productsStore;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 3000);
        // setTimeout(() => {
        //     this.products = null;
        // }, 5000);
    }

    onProductBuy(id: IProduct['_id']) {
        // console.log(id);
    }

    onLoad(loadDirection: LoadDirection) {
        console.log(loadDirection);
    }
}
