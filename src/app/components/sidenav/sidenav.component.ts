import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    ViewChild,
} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {NAME_TOKEN} from '../../shared/test-token/name.token';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NAME_TOKEN,
            useValue: 'SidenavComponent',
        },
    ],
})
export class SidenavComponent {
    @ViewChild(MatDrawer, {static: true}) private readonly drawerComponent?: MatDrawer;

    // constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
    constructor(@Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef) {}

    toggleSidenavOpened() {
        this.drawerComponent?.toggle();
        this.changeDetectorRef.markForCheck();
    }
}
