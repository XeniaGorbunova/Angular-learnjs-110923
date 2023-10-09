import {Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from 'rxjs';
import {IPaginationContext} from './pagination-context.interface';
import {getArrowWithChunks} from '../helpers/get-arrow-with-chunks';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChunkSize = 4;
    private productsWithChunks: T[][] = [];
    private pageIndexes: number[] = [];

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

        this.productsWithChunks = getArrowWithChunks(
            this.appPaginationOf,
            this.appPaginationChunkSize,
        );
        this.pageIndexes = this.getPageIndexes();
        this.activeIndex$.next(0);
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
            activeIndex,
            pageIndexes: this.pageIndexes,
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
