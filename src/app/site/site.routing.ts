import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {WebLayoutComponent} from '../layout/weblayout/weblayout.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
    {   path: '',
        component: WebLayoutComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
            {path: 'service', loadChildren: './services/services.module#ServiceModule'},
        ]
    }
]

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
