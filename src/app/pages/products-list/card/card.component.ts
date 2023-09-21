import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product = productMock;

    buyProduct(event: MouseEvent): void {
        event.stopPropagation();
        // console.log('buy');
    }

    clickCard(): void {
        // console.log('click card');
    }
}
