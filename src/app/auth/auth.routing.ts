import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
        {
            path: '',
            component: AuthComponent,
            children: [
                {path: 'login', component: LoginComponent},
                {path: 'register', component: RegisterComponent},
            ]
        }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes);