import {
    Component,
    ContentChild,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
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

    ngOnInit() {
        this.insertNavigationTempate();
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
