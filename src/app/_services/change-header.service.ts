import {Injectable} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import { AuthComponent } from '../auth/auth.component';

@Injectable({
    providedIn: "root"
})
export class ChangeHeaderService {

    constructor(private _activetedRoute: ActivatedRoute, private _router: Router) {

    }
     public _changeBannerContent() {
        const urlName = this._router.url;
        if(urlName.includes('service')) {
            $('.home-header').css('height', '22rem');
            $('.home-header').css('min-height', '0px');
            $('#_dzheader').removeClass('header').addClass('noheader');
            $('._banner').css('display', 'none');
            $('._bannertwo').css({'display': 'block', "margin": "0 auto", "padding": "120px 0px 0px 150px"});
        } else {
            $('.home-header').css('height', '0px');
            $('.home-header').css('min-height', '48rem');
            $('#_dzheader').removeClass('noheader').addClass('header');
            $('._banner').css('display', 'block');
            $('._bannertwo').css('display', 'none');
            console.log("hiiii");
        }
     }
}