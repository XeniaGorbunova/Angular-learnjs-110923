import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;
    @Output() handleProductBuyClick = new EventEmitter<string>();

    onProductBuy(event: Event, productId: string | undefined) {
        event.stopPropagation();
        this.handleProductBuyClick.emit(productId);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }
}
