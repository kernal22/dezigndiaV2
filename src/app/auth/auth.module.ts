import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {AuthService} from '../_services/_auth/auth.service';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {routing} from './auth.routing';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        routing,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {

}