import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {IDumpNgIfContext} from './dump-ng-if-context.interface';

@Directive({
    selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
    @Input() set appDumpNgIf(data: T) {
        const isContainerHasView = this.viewContainerRef.length;
        const needClear = !data && isContainerHasView;

        if (needClear) {
            this.viewContainerRef.clear();

            return;
        }

        const needCreateView = data && !isContainerHasView;

        if (needCreateView) {
            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: data,
                dumpNgIf: data,
            });
            // this.viewContainerRef.createEmbeddedView(this.templateRef, {
            //     $implicit: 'Maks',
            //     dumpNgIf: 'Fire',
            // });
            // (data as IProduct[]).forEach(({name, price}) => {
            //     this.viewContainerRef.createEmbeddedView(this.templateRef, {
            //         $implicit: name,
            //         dumpNgIf: price,
            //     });
            // });
        }
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IDumpNgIfContext<T>>,
    ) {}
}
