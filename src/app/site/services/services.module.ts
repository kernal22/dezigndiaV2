import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentModule} from '../../components/components.module';

import {ServiceComponent} from './services.component';
import {AndroidDevelopmentComponent, ReactNativeDevelopmentComponent, IonicDevelopmentComponent, IosDevelopmentComponent} from './mobile-development/mobile-development.component';


import {routing} from './services.routing';

@NgModule({
    declarations: [
        ServiceComponent,
        AndroidDevelopmentComponent,
        ReactNativeDevelopmentComponent,
        IonicDevelopmentComponent,
        IosDevelopmentComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        routing,
        ComponentModule
    ],
    providers: [

    ]
})
export class ServiceModule {

}