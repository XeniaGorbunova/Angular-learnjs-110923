import {Component, HostBinding, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input() template: TemplateRef<unknown> | null = null;

    @HostBinding('class.empty')
    get isTemplateNullable(): boolean {
        return !this.template;
    }
}
