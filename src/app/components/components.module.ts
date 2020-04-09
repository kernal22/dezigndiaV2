import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {BoxComponent} from './box/box.component';
import {CardBoxComponent} from './card-box/card-box.component';
import {TechDevelopmentComponent} from './tech-development/tech-development.component';
import {TimelineComponent} from './timeline/timeline.component';
import {CompanyBoxComponent} from './company-box/company-box.component';
import {ModalComponent} from './modal-box/modal.component';

@NgModule({
    declarations: [
        BoxComponent,
        CardBoxComponent,
        TechDevelopmentComponent,
        TimelineComponent,
        CompanyBoxComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BoxComponent,
        CardBoxComponent,
        TechDevelopmentComponent,
        TimelineComponent,
        CompanyBoxComponent,
        ModalComponent
    ],
    providers: [

    ]
})
export class ComponentModule {

}