import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: "card-box-component",
    templateUrl: "card-box.component.html"
})

export class CardBoxComponent implements OnInit {

    @Input() portfolia: Array<any>;

    constructor() {

    }
    ngOnInit() {

    }
}