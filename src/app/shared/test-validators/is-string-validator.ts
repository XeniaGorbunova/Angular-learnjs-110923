import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const isStringValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const hasError = Number(control.value);

    return hasError ? {isString: 'Is not string'} : null;
};

// export function isStringValidator() {

// }
