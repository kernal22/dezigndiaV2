import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {WebLayoutComponent} from './weblayout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MenuBarComponent} from './menu/menu-bar.component';

import {ComponentModule} from '../../components/components.module';

@NgModule({
    declarations: [
        WebLayoutComponent,
        HeaderComponent,
        FooterComponent,
        MenuBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ComponentModule
    ],
    exports: [
        WebLayoutComponent,
        HeaderComponent,
        FooterComponent,
        MenuBarComponent
    ],
    providers: [

    ]
})
export class WebLayoutModule {

}