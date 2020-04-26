import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {BoxInterface} from '../../_models/box';

@Component({
    selector: "blogbox-component",
    templateUrl: "blog-box.component.html"
})

export class BlogBoxComponent implements OnInit {

    @Input() blogbox: Array<any>;

    constructor() {

    }
    ngOnInit() {

    }
}