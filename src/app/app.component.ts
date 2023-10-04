import {ApplicationRef, ChangeDetectionStrategy, Component, DoCheck} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements DoCheck {
    readonly applicationConfig = applicationConfigMock;

    constructor(private readonly applicationRef: ApplicationRef) {
        // this.applicationRef.tick();
        setInterval(() => {
            // eslint-disable-next-line no-console
            console.log('Test zone.js');
        }, 1000);
    }

    ngDoCheck(): void {
        // eslint-disable-next-line no-console
        console.log('AppComponent CD');
    }
}
