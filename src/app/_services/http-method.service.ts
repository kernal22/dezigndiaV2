import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError, retry} from 'rxjs/operators';
import {throwError, Observable} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpMethodsService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {

    }
    private _setHeaders() {
        let headers = new HttpHeaders();
        headers  = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer jhsdjsakjdhasdhshdue837893b32g3');
        headers = headers.set('Cache-Control', 'no');
        headers = headers.set('token', 'asdsaugbugbefuierneoibcquydgkciwe');
        headers = headers.set('sign', 'dsdsadsdsadsd');
        headers = headers.set('Expires', '3600');
        return headers;
    }

    private _handleError(error: HttpErrorResponse) {
        let errorMsg: any;
        if(error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.message}, Status: false`;
        } else {
            errorMsg = {ErrorCode: `${error.status}`, Message: `${error.message}`, ok: `${error.ok}`};
        }
        return throwError(errorMsg);
    }

    public _postCall(url: string, body: {}): Observable<any> {
        
        return this.http.post(`${this.apiUrl}${url}`, body, {headers: this._setHeaders()}).pipe(
            retry(2),
            map((res: Response) => {return res}),
            catchError((err) => this._handleError(err))
        )
    }

    public _getCall(url: string, params ?: any): Observable<any> {
        return this.http.get(url, {params: params, headers: this._setHeaders()}).pipe(
            retry(2),
            map((res: Response) => {return res}),
            catchError(err => this._handleError(err))
        )
    }

    public _putCall(url: string, body: {}, params ?: any): Observable<any> {
        return this.http.put(url, body, {params: params, headers: this._setHeaders()}).pipe(
            retry(2),
            map((res: Response) => {return res}),
            catchError((err) => this._handleError(err))
        )
    }

    public _deleteCall(url: string, params?: any): Observable<any> {
        return this.http.delete(url, {params: params, headers: this._setHeaders()}).pipe(
             retry(1),
             map((res: Response) => {return res}),
             catchError((err) => this._handleError(err))
        )
    }
}