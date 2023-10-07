import {Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {IPaginationContext} from './pagination-context.interface';
import {BehaviorSubject, map, Subject, takeUntil} from 'rxjs';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChunkSize = 4;
    private productsWithChunks: T[][] = [];

    private readonly activeIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnInit() {
        this.listenActiveIndexChange();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges({appPaginationOf}: SimpleChanges) {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    private updateView() {
        if (!this.appPaginationOf?.length) {
            this.viewContainerRef.clear();

            return;
        }

        this.productsWithChunks = this.getProductsWithChunks(
            this.appPaginationOf,
            this.appPaginationChunkSize,
        );
        this.activeIndex$.next(0);
    }

    private getProductsWithChunks(products: T[], chunkSize: number) {
        const result = [];
        for (let i = 0; i < products.length; i += chunkSize) {
            const chunk = products.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }

    private listenActiveIndexChange() {
        this.activeIndex$
            .pipe(
                map(activeIndex => this.getCurrentContext(activeIndex)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(activeIndex: number): IPaginationContext<T> {
        return {
            $implicit: this.productsWithChunks[activeIndex],
            appPaginationOf: this.appPaginationOf as T[],
            appPaginationChunkSize: this.appPaginationChunkSize,
            activeIndex: activeIndex,
            pageIndexes: this.getPageIndexes(),
            selectIndex: (index: number) => {
                this.activeIndex$.next(index);
            },
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private getPageIndexes(): number[] {
        return this.productsWithChunks.map((item, index) => index);
    }

    private next() {
        const nextIndex = this.activeIndex$.value + 1;
        const newIndex = nextIndex < this.productsWithChunks.length ? nextIndex : 0;

        this.activeIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.activeIndex$.value - 1;
        const lastIndex = this.productsWithChunks.length - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : lastIndex;

        this.activeIndex$.next(newIndex);
    }
}
