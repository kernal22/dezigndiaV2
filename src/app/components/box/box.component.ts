import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {BoxInterface} from '../../_models/box';

@Component({
    selector: "box-component",
    templateUrl: "box.component.html"
})

export class BoxComponent implements OnInit {

    @Input() data: Array<BoxInterface>;

    constructor() {

    }
    ngOnInit() {

    }
}