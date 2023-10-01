import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinitScrollDirective} from './infinit-scroll.directive';

@NgModule({
    declarations: [InfinitScrollDirective],
    imports: [CommonModule],
    exports: [InfinitScrollDirective],
})
export class InfinitScrollModule {}
