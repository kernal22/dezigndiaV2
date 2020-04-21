import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import * as $ from 'jquery';
import Typed from 'typed.js';

import {SocialUsers} from '../../../_models/social-login-users';

import {HttpMethodsService} from '../../../_services/http-method.service';
import {AuthCookieHandlerService} from '../../../_services/auth-cookie-handler.service';
import {SocialLoginService} from '../../../_services/social-login.service';
import {MenuService} from '../../../_services/menu.service';
import {ChangeHeaderService} from '../../../_services/change-header.service';

@Component({
    selector: 'app-web-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    @ViewChild('search') search : ElementRef;

    private socialUser = new SocialUsers();
    public response;
    public menuItems;
    public _hide: boolean = true;

    constructor(private _http: HttpMethodsService,
                private _authCookieService: AuthCookieHandlerService,
                private _oAuthService: AuthService,
                private _socialLoginService: SocialLoginService,
                private _menuService: MenuService,
                public _chnageHeader: ChangeHeaderService) {
    }

    ngOnInit() {
        this.loadTypewriter();
        this.getMenuItems();
        this.onScrollCompressMenu();
        // if(this._authCookieService._checkCookie())
        //     console.log(this._authCookieService._getCookie());
        // else
        //     this._authCookieService._setCookie("setcookietest");
        // this._http._getCall('http://dummy.restapiexample.com/api/v1/employees').subscribe(data => {
        //     console.log(data);
        // }, err => {
        //     console.error(err);
        // });
    }
    ngAfterViewInit() {
        // this.modalComponent.contactForm.setParent();
    }
    private loadTypewriter() {
        const options = {
            strings: ["DESIGN", "DEVELOPMENT", "MARKETING"],
            typeSpeed: 30,
            backSpeed: 100,
            showCursor: true,
            cursorChar: '|',
            loop: true
        };
        const typed = new Typed('._deztite', options);
    }

    private getMenuItems() {
        this._menuService.getMenuItems().subscribe(data => {
            this.menuItems = data;
        }, error => {
        })
    }
    public onScrollCompressMenu() {
        $(window).scroll(() => {
            if ($(window).scrollTop() >= 10) {
                $('#navbar-main').addClass("scroll");
                $('#navbar-main').css("background", "#fff");
                $('.navbar-nav .nav-link').css('color', '#000');
                this._hide = false;
                $('.navbar-nav .start-a-project-button').addClass('active');
            } else {
                $('#navbar-main').removeClass("scroll");
                $('#navbar-main').css("background", "transparent");
                $('.navbar-nav .nav-link').css('color', '#fff');
                this._hide = true;
                $('.navbar-nav .start-a-project-button').removeClass('active');
            }
        })
    }
    public onSocialSignIn(socialProvider: string) {
        let socialPlatformProvider;
        if(socialPlatformProvider=='google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } else if(socialPlatformProvider=='facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }

        this._oAuthService.signIn(socialPlatformProvider).then(socialUser => {
            console.log(socialProvider, socialUser);
            this.saveresponse(socialUser);
        })
    }

    public saveresponse(socialUsers: SocialUsers) {
        this._socialLoginService.saveRepsonse(socialUsers).subscribe(socialuserdata=> {
            console.log(socialuserdata);
        }, error => {
            console.log(error, "error");
        });
    }

    public toggleMenu() {
        if($('#navbarNav').hasClass('active')) {
            $('#navbarNav').removeClass('active show');
            $('#navbar-toggle-button').addClass('collapsed');
            $('#mCSB_1').css('margin-top', '20%');
        } else {
            $('#navbarNav').addClass('active show');
            $('#navbar-toggle-button').removeClass('collapsed');
            $('#mCSB_1').removeAttr('margin-top');
        }
    }

    public onHover() {
        $()
    }
}