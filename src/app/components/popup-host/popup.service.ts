import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PopupHostContextInterface} from './popup-host-context.interface';

@Injectable({
    providedIn: 'root',
})
export class PopupService {
    readonly popupTemplateRefStore$ =
        new BehaviorSubject<TemplateRef<PopupHostContextInterface> | null>(null);

    readonly contextStore$ = new BehaviorSubject<PopupHostContextInterface | null>(null);

    get popupTemplateRef$(): Observable<TemplateRef<PopupHostContextInterface> | null> {
        return this.popupTemplateRefStore$.asObservable();
    }

    get context$(): Observable<PopupHostContextInterface | null> {
        return this.contextStore$.asObservable();
    }

    closePopup(): void {
        this.popupTemplateRefStore$.next(null);
    }

    openPopup(
        template: TemplateRef<PopupHostContextInterface>,
        context: PopupHostContextInterface,
    ) {
        this.popupTemplateRefStore$.next(template);
        this.contextStore$.next(context);
    }
}
