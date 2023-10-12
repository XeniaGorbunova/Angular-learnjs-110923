import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    TemplateRef,
} from '@angular/core';
import {PopupHostService} from './popup-host.service';
import {PopupHostContext} from './popup-host-context';
import {map, tap} from 'rxjs';

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
        return !this.template$
            .pipe(
                map((template: TemplateRef<PopupHostContext> | null) => !template),
                tap(() => this.cdr.markForCheck()),
            )
            .subscribe();
    }

    constructor(
        private readonly popupHostService: PopupHostService,
        private readonly cdr: ChangeDetectorRef,
    ) {}

    public closePopup() {
        this.popupHostService.closePopup();
        this.cdr.markForCheck();
    }
}
