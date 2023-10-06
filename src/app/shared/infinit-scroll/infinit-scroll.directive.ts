import {Directive, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './infinit-scroll';

@Directive({
    selector: '[appInfinitScroll]',
})
export class InfinitScrollDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();
    private readonly borderOffset = 100;
    private currentTop = 0;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollHeight, scrollTop, clientHeight}: HTMLElement) {
        const loadDirection = this.getLoadDirection(scrollTop, scrollHeight, clientHeight);

        if (loadDirection) {
            this.loadData.emit(loadDirection);
        }

        this.currentTop = scrollTop;
    }

    private getLoadDirection(
        scrollTop: number,
        scrollHeight: number,
        clientHeight: number,
    ): LoadDirection | null {
        const currentBottom = scrollHeight - clientHeight;
        const isScrollToTop = scrollTop < this.currentTop;
        const isIntersectedTopOffset = scrollTop < this.borderOffset;

        if (isScrollToTop && isIntersectedTopOffset) {
            return LoadDirection.Previous;
        }

        const isIntersectedBottomOffset = scrollTop > currentBottom - this.borderOffset;

        if (!isScrollToTop && isIntersectedBottomOffset) {
            return LoadDirection.Next;
        }

        return null;
    }
}
