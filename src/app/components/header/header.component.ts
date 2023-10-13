import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupHost} from '../popup-host/popup-host';
import {PopupHostContextInterface} from '../popup-host/popup-host-context.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: IApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>();

    constructor(private readonly popupHostService: PopupHost) {}

    openPopup(
        template: TemplateRef<PopupHostContextInterface>,
        context: PopupHostContextInterface,
    ) {
        this.popupHostService.openPopup(template, context);
    }

    closePopup() {
        this.popupHostService.closePopup();
    }
}
