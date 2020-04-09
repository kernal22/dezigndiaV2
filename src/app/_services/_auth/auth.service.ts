import {Injectable} from '@angular/core';
import {HttpMethodsService} from '../http-method.service';

@Injectable()
export class AuthService {
    constructor(private _http: HttpMethodsService) {

    }
    
    onLogin(data) {
        return this._http._postCall('login', data);
    }

    onRegister(data) {
        return this._http._postCall('register', data);
    }
}