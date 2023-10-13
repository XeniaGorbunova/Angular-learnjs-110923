import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupService} from '../popup-host/popup.service';
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

    constructor(private readonly popupService: PopupService) {}

    openPopup(
        template: TemplateRef<PopupHostContextInterface>,
        context: PopupHostContextInterface,
    ) {
        this.popupService.openPopup(template, context);
    }

    closePopup() {
        this.popupService.closePopup();
    }
}
