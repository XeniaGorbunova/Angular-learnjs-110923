import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {PopupService} from './popup.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly template$ = this.popupService.popupTemplateRef$;
    readonly context$ = this.popupService.context$;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return this.popupService.isNoTemplateRef;
    }

    constructor(private readonly popupService: PopupService) {}

    public closePopup() {
        this.popupService.closePopup();
    }
}
