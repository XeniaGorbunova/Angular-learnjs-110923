import {
    Component,
    ContentChild,
    ElementRef,
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
// implements
//     OnChanges,
//     OnInit,
//     DoCheck,
//     AfterContentInit,
//     AfterContentChecked,
//     AfterViewInit,
//     AfterViewChecked,
//     OnDestroy
export class SidenavComponent implements OnInit {
    // @Input() isSidenavOpened = false;
    // @Input() isSidenav = false;
    // @Input() navigationTemplate: TemplateRef<unknown> | null = null;
    // @Input() set navigationTemplate(template: TemplateRef<unknown>) {
    //     this.viewport?.clear();
    //     this.viewport?.createEmbeddedView(template);
    // }

    // @Output() isSidenavOpenedChange = new EventEmitter<boolean>();

    // @ViewChild('matDrawer') private readonly drawerComponent?: MatDrawer;
    @ViewChild(MatDrawer, {static: true}) private readonly drawerComponent?: MatDrawer;
    @ViewChild(MatDrawer, {read: ElementRef, static: false})
    private readonly drawerElement?: ElementRef<HTMLElement>;

    @ViewChild('viewport', {static: true, read: ViewContainerRef})
    private readonly viewport?: ViewContainerRef;

    @ContentChild('navigationTemplate', {static: true})
    private readonly navigationTemplate?: TemplateRef<unknown>;

    ngOnInit() {
        this.insertNavigationTempate();
    }

    // readonly testProperty: boolean;

    // constructor() {
    //     // this.testProperty = false;

    //     console.log('constructor', this.isSidenavOpened);
    // }

    toggleSidenavOpened() {
        this.drawerComponent?.toggle();

        // eslint-disable-next-line no-console
        console.log(this.drawerElement?.nativeElement);
        // this.isSidenavOpened = !this.isSidenavOpened;
        // this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
    }

    private insertNavigationTempate() {
        if (this.navigationTemplate) {
            this.viewport?.createEmbeddedView(this.navigationTemplate);
        }
    }

    // ngOnChanges({isSidenav, isSidenavOpened}: SimpleChanges) {
    //     if (isSidenav) {
    //         console.log('isSidenav Changed', isSidenav);
    //     }

    //     if (isSidenavOpened) {
    //         console.log(
    //             'isSidenavOpened Changed',
    //             isSidenavOpened.currentValue,
    //             this.isSidenavOpened,
    //         );
    //     }
    // }

    // ngOnInit() {
    //     // this.testProperty = false;

    //     console.log('ngOnInit', this.isSidenavOpened);
    //     console.log('ngOnInit - drawerComponent', this.drawerComponent);
    //     console.log('ngOnInit - drawerElement', this.drawerElement);
    // }

    // ngDoCheck() {
    //     console.log('ngDoCheck');
    // }

    // ngAfterContentInit() {
    //     console.log('ngAfterContentInit');
    // }

    // ngAfterContentChecked() {
    //     console.log('ngAfterContentChecked');
    // }

    // ngAfterViewInit() {
    //     console.log('ngAfterViewInit');
    //     console.log('ngAfterViewInit - drawerComponent', this.drawerComponent);
    //     console.log('ngAfterViewInit - drawerElement', this.drawerElement);
    // }

    // ngAfterViewChecked() {
    //     console.log('ngAfterViewChecked');
    // }

    // ngOnDestroy() {
    //     console.log('ngOnDestroy');
    // }
}
