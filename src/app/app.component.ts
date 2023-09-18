import {Component} from '@angular/core';

@Component({
    selector: 'app-root', // selector host element
    templateUrl: './app.component.html',
    // template: `<h1 class="title">Hello word</h1>`,
    styleUrls: ['./app.component.css'],
    // styles: ['h1 {color: green}', ],
    interpolation: ['{{', '}}'],
})
export class AppComponent {
    title = 'Angular-learnjs-110923';

    window = window;

    getName(): string {
        return 'Egor';
    }

    onHeaderClick() {
        // eslint-disable-next-line no-console
        console.log('Header click');
    }

    logKeyEvent(event: Event) {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
