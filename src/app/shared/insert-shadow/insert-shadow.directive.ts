import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
    selector: '[appInsertShadow]',
    exportAs: 'appInsertShadow',
})
export class InsertShadowDirective {
    // constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    //     this.elementRef.nativeElement.style.boxShadow = 'inset 0 0 10px #000';
    // }

    // @HostListener('touch', ['$event'])
    // @HostListener('window:click', ['$event.clientY', '$event.clientX'])

    // @HostListener('click', ['$event.clientY', '$event.clientX'])
    // onClick(y: number, x: number) {
    //     console.log('Clicked', x, y);

    //     this.boxShadow = !this.boxShadow ? 'inset 0 0 10px #000' : '';
    // }

    // @HostBinding('style.boxShadow')
    // boxShadow = '';

    @HostListener('click') // <host-element (click)="toggleBoxShadow()">
    toggleBoxShadow() {
        this.isBoxShadowActive = !this.isBoxShadowActive;
    }

    @HostBinding('style.boxShadow') // <host-element [style.boxShadow]="boxShadow">
    get boxShadow(): string {
        return this.isBoxShadowActive ? 'inset 0 0 10px #000' : '';
    }

    private isBoxShadowActive = false;
}
