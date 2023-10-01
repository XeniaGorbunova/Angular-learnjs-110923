import {Directive, ElementRef, Output, EventEmitter, HostListener, OnInit} from '@angular/core';
import {LoadDirection} from './infinit-scroll';

@Directive({
    selector: '[appInfinitScroll]',
})
export class InfinitScrollDirective implements OnInit {
    @Output() loadData = new EventEmitter<LoadDirection>();
    private readonly borderOffset = 100;
    private currentTop: number | null = null;
    private currentBottom: number | null = null;

    constructor(private readonly elementRef: ElementRef) {}

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollHeight, scrollTop, clientHeight}: HTMLElement) {
        const loadDirection = this.getLoadDirection(scrollTop);

        if (loadDirection) {
            this.loadData.emit(loadDirection);
        }

        this.currentTop = scrollTop;
        this.currentBottom = scrollHeight - clientHeight;
    }

    ngOnInit(): void {
        this.setInitialValues();
    }

    private setInitialValues(): void {
        this.currentTop = 0;
        this.currentBottom =
            this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.clientHeight;
    }

    private getLoadDirection(scrollTop: number): LoadDirection | null {
        if (scrollTop < this.currentTop! && scrollTop < this.borderOffset) {
            return LoadDirection.Previous;
        }

        if (scrollTop > this.currentTop! && scrollTop > this.currentBottom! - this.borderOffset) {
            return LoadDirection.Next;
        }

        return null;
    }
}
