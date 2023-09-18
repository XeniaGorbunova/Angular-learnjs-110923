import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    readonly title = 'Angular-learnjs-110923';
    // readonly faviconSrc = '../../../favicon.ico';
    readonly faviconSrc =
        'https://avatars.mds.yandex.net/i?id=42bbbbf7feb384c1b5091dfb67bdef4d4be257d1-10096313-images-thumbs&n=13';

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
