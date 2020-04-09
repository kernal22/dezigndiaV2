import {Injectable} from "@angular/core";
import {HttpMethodsService} from './http-method.service';

@Injectable({
    providedIn: "root"
})
export class SocialLoginService {
    constructor(private _http: HttpMethodsService){}

    public saveRepsonse(response) {
        let url =  'http://localhost:64726/Api/Login/Savesresponse';
        return this._http._postCall(url,response);
    }
}