import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IsStringValidatorDirective} from './is-string-validator.directive';

@NgModule({
    declarations: [IsStringValidatorDirective],
    imports: [CommonModule],
    exports: [IsStringValidatorDirective],
})
export class IsStringValidatorModule {}
