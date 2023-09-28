import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent
    implements
        OnChanges,
        OnInit,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy
{
    readonly products = productsMock;

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        // eslint-disable-next-line no-console
        console.log(id);
    }

    // --------------------------------------------------------

    constructor() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'constructor');
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngOnChanges', simpleChanges);
    }

    ngOnInit() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngOnInit');
    }

    ngDoCheck() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngDoCheck');
    }

    ngAfterContentInit() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngAfterContentInit');
    }

    ngAfterContentChecked() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngAfterContentChecked');
    }

    ngAfterViewInit() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngAfterViewInit');
    }

    ngAfterViewChecked() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngAfterViewChecked');
    }

    ngOnDestroy() {
        // eslint-disable-next-line no-console
        console.log('ProductsListComponent', 'ngOnDestroy');
    }

    // --------------------------------------------------------
}
