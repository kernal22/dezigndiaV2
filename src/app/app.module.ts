import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import {LoaderModule} from './loader/loader.module';

import {HttpInterceptorService} from './_interceptors/http.interceptors';
import {LoaderInterceptor} from './_interceptors/loader.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonDirective} from './_directives/button.directive';
import {ShadowDirective} from './_directives/shadow.directive';
import {ReversStringPipe} from './_pipes/reverse-string.pipe';


export function socialConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("Facebook-App-Id")
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ButtonDirective,
    ShadowDirective,
    ReversStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    LoaderModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: AuthServiceConfig,  useFactory: socialConfigs }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
