import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    public product: IProduct = productMock;

    public buyProduct(event: MouseEvent) {
        event.stopPropagation();
        console.log('buy');
    }

    public clickCard() {
        console.log('click card');
    }
}
