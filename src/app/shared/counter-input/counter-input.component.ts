import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-counter-input',
    templateUrl: './counter-input.component.html',
    styleUrls: ['./counter-input.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: CounterInputComponent,
            multi: true,
        },
    ],
})
export class CounterInputComponent implements ControlValueAccessor {
    @Input() step = 1;

    counter = 0;
    isDisabled = false;

    onChange: (newCounter: number) => void = (_newCounter: number) => {
        console.error('CounterInputComponent not connected');
    };

    onTouched: () => void = () => {
        console.error('CounterInputComponent not connected');
    };

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

    writeValue(newCounter: number) {
        this.counter = newCounter;

        // eslint-disable-next-line no-console
        // console.log('writeValue', newCounter);

        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(cb: (newCounter: number) => void) {
        this.onChange = cb;

        // eslint-disable-next-line no-console
        // console.log('registerOnChange', cb);
    }

    registerOnTouched(cb: () => void) {
        this.onTouched = cb;

        // eslint-disable-next-line no-console
        // console.log('onTouched', cb);
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;

        this.changeDetectorRef.markForCheck();
    }

    back() {
        this.counter -= this.step;

        // eslint-disable-next-line no-console
        // console.log('back', this.counter);

        this.onChange(this.counter);
        this.onTouched();
    }

    next() {
        this.counter += this.step;

        // eslint-disable-next-line no-console
        // console.log('next', this.counter);

        this.onChange(this.counter);
        this.onTouched();
    }
}
