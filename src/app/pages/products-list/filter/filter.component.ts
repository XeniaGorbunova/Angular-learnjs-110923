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
import {Observable, map} from 'rxjs';
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

    readonly filterForm = this.formBuilder.group({
        name: '',
        priceRange: this.formBuilder.group({
            min: 0,
            max: 999999,
        }),
        brands: this.formBuilder.array<FormControl<boolean>>([]),
    });

    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit() {
        this.listenFormChange();
    }

    ngOnChanges({brands}: SimpleChanges) {
        if (brands) {
            this.updateBrandsControl();
        }
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
            )
            // eslint-disable-next-line no-console
            .subscribe(console.log);
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
