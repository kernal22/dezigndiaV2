import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpResponse, HttpRequest, HttpHandler} from '@angular/common/http';
import {LoaderService} from '../_services/loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private httpRequest: HttpRequest<any>[] = [];

    constructor(private _loaderService: LoaderService) {

    }

    private removeRequest(req: HttpRequest<any>) {
        const i = this.httpRequest.indexOf(req);
        if(i >= 0) {
            this.httpRequest.slice(i, 1);
        }
        // this._loaderService.isLoading.next(this.httpRequest.length > 0);
        this._loaderService.isLoading.next(false);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.httpRequest.push(req);
        // console.log("No of requests--->" + this.httpRequest.length);
        this._loaderService.isLoading.next(true);
        
        return Observable.create(observer => {
            const subscription = next.handle(req).subscribe(
                event => {
                    if(event instanceof HttpResponse){
                        this.removeRequest(req);
                        observer.next(event);
                    }
                }, err => {
                    this.removeRequest(req);
                    observer.error(err);
                }, () => {
                    this.removeRequest(req);
                    observer.complete();
                });

                return () => {
                    this.removeRequest(req);
                    subscription.unsubscribe();
                }
        });
    }
}