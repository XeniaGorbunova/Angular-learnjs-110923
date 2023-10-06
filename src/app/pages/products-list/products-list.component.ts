import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Observable, of} from 'rxjs';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    // products: IProduct[] | null = null;
    products$: Observable<IProduct[]> = of(productsMock);

    // for easy
    name = 'Мышь';

    // for hard
    readonly propertyName = 'feedbacksCount' as const; // keyof IProduct
    searchPropertyValue = 2;

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    // ngOnInit(): void {
    // this.changeDetectorRef.detach();
    // this.changeDetectorRef.detectChanges();

    // setTimeout(() => {
    //     this.products = productsMock;
    //     this.changeDetectorRef.markForCheck();
    //     // this.changeDetectorRef.detectChanges();
    //     // console.log('detectChanges 3');
    //     // this.changeDetectorRef.reattach();
    // }, 3000);
    // setTimeout(() => {
    //     this.products = [...productsMock.map(product => ({...product, feedbacksCount: 1}))];
    //     this.changeDetectorRef.markForCheck();
    //     console.log('markForCheck 6');
    //     // this.changeDetectorRef.detectChanges();
    // }, 6000);
    // }

    // ngDoCheck(): void {
    //     console.log('ngDoCheck');
    // }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }
}
