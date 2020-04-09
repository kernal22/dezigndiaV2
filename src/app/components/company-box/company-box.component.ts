import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {BoxInterface} from '../../_models/box';

@Component({
    selector: "companybox-component",
    templateUrl: "company-box.component.html"
})

export class CompanyBoxComponent implements OnInit {

    @Input() data: Array<any>;

    constructor() {

    }
    ngOnInit() {

    }
}