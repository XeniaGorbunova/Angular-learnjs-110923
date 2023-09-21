import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    readonly title = 'Angular-learnjs-110923';
    readonly shopIconSrc = '../../../favicon.ico';

    onMenuClick() {
        // eslint-disable-next-line no-console
        console.log('Menu click');
    }

    onShareClick(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        console.log('Share click');
    }
}
