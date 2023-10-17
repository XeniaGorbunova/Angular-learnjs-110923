import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {tap} from 'rxjs';
import {PopupService} from './popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    private isEmpty = true;
    readonly template$ = this.popupService.popupTemplateRef$.pipe(
        tap(popupTemplateRef => {
            this.isEmpty = !popupTemplateRef;
        }),
    );

    readonly context$ = this.popupService.context$;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return this.isEmpty;
    }

    constructor(private readonly popupService: PopupService) {}

    closePopup() {
        this.popupService.closePopup();
    }
}
