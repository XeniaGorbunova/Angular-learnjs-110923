import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {IDumpNgIfContext} from './dump-ng-if-context.interface';

@Directive({
    selector: '[appDumpNgIf]',
})
export class DumpNgIfDirective<T> {
    @Input() set appDumpNgIf(data: T | null | undefined) {
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
                appDumpNgIf: data,
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

    static ngTemplateContextGuard<T>(
        _directive: DumpNgIfDirective<T>,
        _context: unknown,
    ): _context is IDumpNgIfContext<T> {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngTemplateGuard_appDumpNgIf<T>(
        _directive: DumpNgIfDirective<T>,
        _inputValue: T | null | undefined,
    ): _inputValue is T {
        return true;
    }
}
