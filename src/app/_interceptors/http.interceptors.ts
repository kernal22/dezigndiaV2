import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor() {

    }

    private _errorHandler(error: HttpErrorResponse){
        return throwError(error);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(this._errorHandler)
        )
    }
}