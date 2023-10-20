import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IsStringAsyncValidatorDirective} from './is-string-async-validator.directive';

@NgModule({
    declarations: [IsStringAsyncValidatorDirective],
    imports: [CommonModule],
    exports: [IsStringAsyncValidatorDirective],
})
export class IsStringAsyncValidatorModule {}
