import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
    Observable,
    debounceTime,
    distinctUntilChanged,
    map,
    startWith,
    switchMap,
    tap,
    timer,
} from 'rxjs';
import {AbstractControl, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {IProduct} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';
import {isStringValidator} from '../../shared/test-validators/is-string-validator';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.productsStoreService.loadProducts(subCategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    readonly searchForm = new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
        asyncValidators: [this.asyncValidator.bind(this)],
        updateOn: 'blur',
    });

    readonly searchFormErrors$ = this.searchForm.statusChanges.pipe(
        map(status => (status === 'INVALID' ? this.searchForm.errors : null)),
    );

    readonly searchFormValue$ = this.searchForm.valueChanges.pipe(
        startWith(this.searchForm.value),
        debounceTime(300),
        distinctUntilChanged(),
    );

    readonly counterForm = new FormControl(10);
    readonly counterFormValue$ = this.counterForm.valueChanges.pipe(
        startWith(this.counterForm.value),
        debounceTime(300),
        distinctUntilChanged(),
    );

    counter = 5;

    searchName = '';

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    trackById(_index: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }

    private asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        return timer(3000).pipe(map(() => isStringValidator(control)));
    }
}
