import {Injectable, TemplateRef} from '@angular/core';
import {PopupHostContextInterface} from './popup-host-context.interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupHost {
    public readonly popupTemplateRefStore$ =
        new BehaviorSubject<TemplateRef<PopupHostContextInterface> | null>(null);
    public readonly contextStore$ = new BehaviorSubject<PopupHostContextInterface | null>(null);

    get popupTemplateRef$(): Observable<TemplateRef<PopupHostContextInterface> | null> {
        return this.popupTemplateRefStore$.asObservable();
    }

    get context$(): Observable<PopupHostContextInterface | null> {
        return this.contextStore$.asObservable();
    }

    constructor() {}

    public closePopup(): void {
        this.popupTemplateRefStore$.next(null);
    }

    public openPopup(
        template: TemplateRef<PopupHostContextInterface>,
        context: PopupHostContextInterface,
    ) {
        this.popupTemplateRefStore$.next(template);
        this.contextStore$.next(context);
    }

    get isNoTemplateRef(): boolean {
        return !this.popupTemplateRefStore$.value;
    }
}
