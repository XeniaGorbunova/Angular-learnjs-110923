import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAsyncPipe} from './my-async.pipe';

@NgModule({
    declarations: [MyAsyncPipe],
    imports: [CommonModule],
    exports: [MyAsyncPipe],
})
export class MyAsyncModule {}
