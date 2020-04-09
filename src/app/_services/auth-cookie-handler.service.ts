import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: "root"
})
export class AuthCookieHandlerService {
    constructor(private _cookieService: CookieService) {}

    public _getCookie(): string {
        return this._cookieService.get('token');
    }
    public _setCookie(tokenName, tokenValue): void {
        this._cookieService.set(tokenName, tokenValue, 100, '', '', false, "Strict");
    }
    public _deleteCookie(): void {
        this._cookieService.deleteAll();
    }
    public _checkCookie(): boolean {
        return this._cookieService.check('token');
    }
}