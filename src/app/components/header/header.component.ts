import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupHostService} from '../popup-host/popup-host.service';
import {PopupHostContext} from '../popup-host/popup-host-context';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: IApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>();

    constructor(private readonly popupHostService: PopupHostService) {}

    openPopup(template: TemplateRef<PopupHostContext>, context: PopupHostContext) {
        this.popupHostService.openPopup(template, context);
    }

    closePopup() {
        this.popupHostService.closePopup();
    }
}
