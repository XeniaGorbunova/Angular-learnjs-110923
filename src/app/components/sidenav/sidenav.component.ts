import {
    Component,
    ContentChild,
    ElementRef,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {MatList} from '@angular/material/list';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
    @ViewChild(MatDrawer, {static: true}) private readonly drawerComponent?: MatDrawer;

    @ViewChild('viewport', {static: true, read: ViewContainerRef})
    private readonly viewport?: ViewContainerRef;

    @ContentChild('navigationTemplate', {static: true})
    private readonly navigationTemplate?: TemplateRef<unknown>;

    @ContentChild(MatList, {static: true, read: ElementRef})
    private readonly testElement?: ElementRef<unknown>;

    @ContentChild('div', {static: true, read: ElementRef, descendants: false})
    private readonly divTestElement?: ElementRef<unknown>;

    ngOnInit() {
        // eslint-disable-next-line no-console
        console.log(this.testElement, this.divTestElement);
        // this.insertNavigationTempate();
    }

    toggleSidenavOpened() {
        this.drawerComponent?.toggle();
    }

    private insertNavigationTempate() {
        if (this.navigationTemplate) {
            this.viewport?.createEmbeddedView(this.navigationTemplate);
        }
    }
}
