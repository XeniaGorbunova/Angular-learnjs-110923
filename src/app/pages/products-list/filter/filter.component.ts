import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';
import {Observable, map, tap, delay, take} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {IProductsFilterForm} from './products-filter-form.interface';
import {IProductsFilter} from './products-filter.interface';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges, OnInit {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();
    @Output() setFilterName = new EventEmitter<string>();

    readonly filterForm = this.formBuilder.group({
        name: '',
        priceRange: this.formBuilder.group({
            min: 0,
            max: 999999,
        }),
        brands: this.formBuilder.array<FormControl<boolean>>([]),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.listenFormChange();
        this.setFormValuesFromUrl();
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
    }

    private setFormValuesFromUrl() {
        this.activatedRoute.queryParams
            .pipe(
                take(1),
                tap(params => {
                    if (params.name) {
                        this.filterForm?.get('name')?.setValue(params.name);
                    }

                    if (params.minPrice) {
                        this.filterForm?.get('priceRange')?.get('min')?.setValue(params.minPrice);
                    }

                    if (params.maxPrice) {
                        this.filterForm?.get('priceRange')?.get('max')?.setValue(params.maxPrice);
                    }

                    if (params.brands) {
                        const brandsFromParams = decodeURIComponent(params.brands).split(';');

                        brandsFromParams.forEach((brand: string) => {
                            this.filterForm.get('brands')?.get(brand)?.setValue(true);
                        });
                    }
                }),
            )
            .subscribe();
    }

    private updateBrandsControl() {
        const brandsControls = this.brands
            ? this.brands.map(() => new FormControl(false) as FormControl<boolean>)
            : ([] as Array<FormControl<boolean>>);

        const brandsForm = new FormArray<FormControl<boolean>>(brandsControls);

        this.filterForm.setControl('brands', brandsForm);
    }

    private listenFormChange() {
        const changeFormValue$ = this.filterForm.valueChanges as Observable<IProductsFilterForm>;

        changeFormValue$
            .pipe(
                map(
                    ({brands, ...otherFormsValue}): IProductsFilter => ({
                        ...otherFormsValue,
                        brands: this.getSelectedBrands(brands as boolean[]),
                    }),
                ),
                delay(300),
                tap((filterValue: IProductsFilter) => {
                    this.setFilterName.emit(filterValue.name);
                    this.updateQueryParams(filterValue);
                }),
            )
            // eslint-disable-next-line no-console
            .subscribe(console.log);
    }

    private updateQueryParams(queryParams: IProductsFilter) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                name: queryParams.name,
                minPrice: queryParams.priceRange.min,
                maxPrice: queryParams.priceRange.max,
                brands: encodeURIComponent(queryParams.brands.join(';')),
            },
            queryParamsHandling: 'merge',
        });
    }

    private getSelectedBrands(brandSelection: boolean[]): string[] {
        return this.brands ? this.brands.filter((_brand, index) => brandSelection[index]) : [];
    }
}

// Template driven Forms

// @Component({
//     selector: 'app-filter',
//     templateUrl: './filter.template-driven.component.html',
//     styleUrls: ['./filter.component.css'],
//     changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FilterComponent {
//     @Input() brands: string[] | null = null;

//     @Output() changeFilter = new EventEmitter<IProductsFilter>();

//     readonly templateFormValue = {
//         name: '123',
//         priceRange: {
//             min: 10,
//             max: 200,
//         },
//         brands: {} as Record<string, boolean>,
//     };

//     logValue(value: unknown) {
//         // console.log(this.templateFormValue);
//         const {brands, ...otherValue} = value as {brands: boolean[]};

//         // eslint-disable-next-line no-console
//         console.log({
//             ...otherValue,
//             brands: Object.entries(brands)
//                 .filter(([_name, isActive]) => isActive)
//                 .map(([name]) => name),
//         });
//         // eslint-disable-next-line no-console
//         console.log('Initial value', this.templateFormValue);
//     }
// }
