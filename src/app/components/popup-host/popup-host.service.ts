import {Injectable, TemplateRef} from '@angular/core';
import {PopupHostContext} from './popup-host-context';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupHostService {
    public readonly popupTemplateRefStore$ =
        new BehaviorSubject<TemplateRef<PopupHostContext> | null>(null);
    public readonly contextStore$ = new BehaviorSubject<PopupHostContext | null>(null);

    get popupTemplateRef$(): Observable<TemplateRef<PopupHostContext> | null> {
        return this.popupTemplateRefStore$.asObservable();
    }

    get context$(): Observable<PopupHostContext | null> {
        return this.contextStore$.asObservable();
    }

    constructor() {}

    public closePopup(): void {
        this.popupTemplateRefStore$.next(null);
    }

    public openPopup(template: TemplateRef<PopupHostContext>, context: PopupHostContext) {
        this.popupTemplateRefStore$.next(template);
        this.contextStore$.next(context);
    }
}
