import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent
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
    @Input() product: IProduct | undefined;

    @Output() readonly buy = new EventEmitter<IProduct['_id']>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.buy.emit(this.product!._id);
    }

    isStarActive(starIndex: number): boolean {
        return !!(this.product && this.product.rating >= starIndex);
    }

    // --------------------------------------------------------

    constructor() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'constructor');
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngOnChanges', simpleChanges);
    }

    ngOnInit() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngOnInit');
    }

    ngDoCheck() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngDoCheck');
    }

    ngAfterContentInit() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngAfterContentInit');
    }

    ngAfterContentChecked() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngAfterContentChecked');
    }

    ngAfterViewInit() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngAfterViewInit');
    }

    ngAfterViewChecked() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngAfterViewChecked');
    }

    ngOnDestroy() {
        // eslint-disable-next-line no-console
        console.log('CardComponent', 'ngOnDestroy');
    }

    // --------------------------------------------------------
}
