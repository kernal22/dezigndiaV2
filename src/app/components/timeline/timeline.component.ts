import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: "app-timeline",
    templateUrl: "timeline.component.html"
})
export class TimelineComponent implements OnInit {

    @Input() timeline: string;
    @Input() stackname: string;

    constructor() {

    }
    ngOnInit() {

    }
}