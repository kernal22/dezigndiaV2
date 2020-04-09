import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../_services/_auth/auth.service';
import {AuthCookieHandlerService} from '../../_services/auth-cookie-handler.service';

@Component({
    selector: "app-login",
    templateUrl: "login.component.html",
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _cookieService: AuthCookieHandlerService) {

    }
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.loginForm = this._fb.group({
            username: [],
            password: []
        });
    }

    onLogin() {
        this._authService.onLogin(this.loginForm.value).subscribe(data => {
            if(data.status) {
                this._cookieService._setCookie('token', data.data.token);
                this._cookieService._setCookie('sign', data.data.sign);
            }
        }, error => {
            console.log(error);
        });
    }
}