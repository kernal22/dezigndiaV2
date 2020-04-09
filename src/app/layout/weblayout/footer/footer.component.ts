import {Component, OnInit} from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { MainMenuItem } from '../../../_models/menu';
import {MenuService} from '../../../_services/menu.service';

@Component({
    selector: 'app-web-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    public footerMenuItems: Array<MainMenuItem>;
    public socialMedia: Array<any>;
    public email: string;
    constructor(private _menuService: MenuService) {

    }

    ngOnInit() {
        this.getMenuItems();
    }

    private getMenuItems() {
        let footerMenu = this._menuService.getFooterMenuItems();
        let socialMedia = this._menuService.getSocialMedia();
        forkJoin([footerMenu, socialMedia]).subscribe(result => {
            this.footerMenuItems = result[0];
            this.socialMedia = result[1];
        }, error => {

        });
    }

    public checkMail() {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        console.log(this.email);
        
        if(re.test(this.email)) {
            console.log("valid");
        } else {
            console.log("invalid");
        }
        // console.log(this.email);
    }
    public onSubscribe(email) {
        console.log(email);
    }
}