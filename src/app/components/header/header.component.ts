import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IApplicationConfig} from '../../shared/application-config/application-config.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    @Input() applicationConfig: IApplicationConfig | null = null;
    // readonly title = 'Angular-learnjs-110923';
    // readonly shopIconSrc = '../../../favicon.ico';

    // @Output() readonly menuClick = of(1, 2, 3);
    @Output() readonly menuClick = new EventEmitter<Event>();
    // @Output() readonly menuClick = this.form.valueChanges;

    onMenuClick(event: Event) {
        // eslint-disable-next-line no-console
        console.log('Menu click');

        // this.menuClick.next(event);
        this.menuClick.emit(event);
    }

    onShareClick(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Share click');
    }
}
