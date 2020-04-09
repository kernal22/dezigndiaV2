import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {ServiceComponent} from './services.component';
import {AndroidDevelopmentComponent, ReactNativeDevelopmentComponent, IonicDevelopmentComponent, IosDevelopmentComponent} from './mobile-development/mobile-development.component';

export const routes: Routes = [
    {   path: '',
        component: ServiceComponent,
        children: [
            {path: 'android-developement', component: AndroidDevelopmentComponent},
            {path: 'react-native-developement', component: ReactNativeDevelopmentComponent} ,
            {path: 'ionic-developement', component: IonicDevelopmentComponent} ,
            {path: 'ios-developement', component: IosDevelopmentComponent}
        ]
    }
]

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
