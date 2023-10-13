import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {PopupHost} from './popup-host';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly template$ = this.popupHostService.popupTemplateRef$;
    readonly context$ = this.popupHostService.context$;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return this.popupHostService.isNoTemplateRef;
    }

    constructor(private readonly popupHostService: PopupHost) {}

    public closePopup() {
        this.popupHostService.closePopup();
    }
}
