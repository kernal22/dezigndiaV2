import {Component, OnInit, Input, HostListener} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
    @Input() menuItems: any;
    public show = 0;

    constructor() {

    }
    ngOnInit() {
    }
}