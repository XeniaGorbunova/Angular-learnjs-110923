import {
    Directive,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subscription, map} from 'rxjs';
import {ICarouselContext} from './carousel-context.interface';

@Directive({
    selector: '[appCarousel]',
})
export class CarouselDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appCarouselOf: T[] | undefined | null;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly subscription = new Subscription();

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<ICarouselContext<T>>,
    ) {}

    ngOnChanges({appCarouselOf}: SimpleChanges) {
        if (appCarouselOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private updateView() {
        const hasViewItems = this.appCarouselOf?.length;

        if (hasViewItems) {
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentIndex() {
        const subscription = this.currentIndex$
            .pipe(map(currentIndex => this.getCurrentContext(currentIndex)))
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });

        this.subscription.add(subscription);
    }

    private getCurrentContext(currentIndex: number): ICarouselContext<T> {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $implicit: this.appCarouselOf![currentIndex],
            appCarouselOf: this.appCarouselOf as T[],
            index: currentIndex,
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
        };
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newIndex = nextIndex < this.appCarouselOf!.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const lastIndex = this.appCarouselOf!.length - 1;
        const newIndex = previousIndex >= 0 ? previousIndex : lastIndex;

        this.currentIndex$.next(newIndex);
    }
}
