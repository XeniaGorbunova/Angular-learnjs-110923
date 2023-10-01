import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
import {LoadDirection} from './infinit-scroll';

@Directive({
    selector: '[appInfinitScroll]',
})
export class InfinitScrollDirective {
    @Output() onLoad = new EventEmitter<LoadDirection>();

    constructor() {}

    @HostListener('scroll', ['$event'])
    onScroll(event: Event) {
        const scrollTop = (event.target as HTMLElement).scrollTop;
        const scrollHeight = (event.target as HTMLElement).scrollHeight;
        const loadDirection = this.getLoadDirection(scrollTop, scrollHeight);

        this.onLoad.emit(loadDirection);
    }
    private getLoadDirection(scrollTop: number, scrollHeight: number): LoadDirection {
        if (scrollTop < 100) {
            return LoadDirection['Previous'];
        }
        if (scrollTop > scrollHeight - 100) {
            return LoadDirection['Next'];
        }
        return LoadDirection['None'];
    }
}
