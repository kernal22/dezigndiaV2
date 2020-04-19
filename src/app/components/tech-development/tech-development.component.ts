import {Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: "app-tech-development",
    templateUrl: "tech-development.component.html"
})
export class TechDevelopmentComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() stackname: string;
    @Input() data: Array<any>;
    @Input() portfolia: Array<any>;
    @Input() serviceList: Array<any>;
    @Input() timeline: Array<any>;
    @Input() companybox: Array<any>;

    constructor() {

    }
    ngOnInit() {
        console.log(this.companybox, 12);
    }
    ngOnChanges() {
        // console.log(this.data, 13);
    }
    ngAfterViewInit() {
        // console.log(this.data, 14);
    }
}