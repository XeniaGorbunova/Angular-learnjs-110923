import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {IProductsFilter} from './products-filter.interface';

// Reactive Forms

// interface IFilterFormValue {
//     name: string;
//     priceRange: {
//         min: number;
//         max: number;
//     };
//     brands: boolean[];
// }

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
    @Input() brands: string[] | null = null;

    @Output() changeFilter = new EventEmitter<IProductsFilter>();

    // readonly filterForm = new FormGroup({
    //     name: new FormControl(''),
    //     priceRange: new FormGroup({
    //         min: new FormControl(0),
    //         max: new FormControl(999999),
    //     }),
    //     // brands: new FormGroup({}),
    //     brands: new FormArray<FormControl<boolean>>([]),
    // });
    readonly filterForm = this.formBuilder.group({
        name: [{value: 'Test', disabled: false}, {validators: [Validators.required]}],
        // name: this.formBuilder.control(...['', {validators: [Validators.required]}]),
        priceRange: this.formBuilder.group({
            min: [0],
            max: [999999],
        }),
        // brands: new FormGroup({}),
        brands: this.formBuilder.array<FormControl<boolean>>([]),
    });

    constructor(private readonly formBuilder: FormBuilder) {}

    // ngOnInit(): void {
    // this.filterForm.valueChanges.subscribe(console.log);
    // this.filterForm.setValue({// IFilterFormValue
    //     name: '123',
    //     priceRange: {
    //         min: 10,
    //         max: 200,
    //     },
    //     brands: [],
    // });
    // this.filterForm.patchValue({ // Partial<IFilterFormValue>
    //     name: '123',
    //     priceRange: {
    //         min: 10,
    //     },
    // });
    // }

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
