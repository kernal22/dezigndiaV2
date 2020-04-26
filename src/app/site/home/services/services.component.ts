import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

import {BoxInterface} from '../../../_models/box';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html'
})
export class ServiceComponent implements OnInit {
    public serviceList: Array<any>;

    constructor() {
        
    }
    ngOnInit() {
        this.serviceList = [
            {title: "Mobile Development", icon: "mobile", list: [
                {title: "Android Development", "link": "/service/android-development"},
                {title: "React- Native Development"},
                {title: "Hybrid Development"},
                {title: "Ios Development"}
            ]},
            {title: "Web Development", icon: "laptop", list: [
                {title: "Angular Development"},
                {title: "React Development"},
                {title: "PHP Development"},
                {title: "Python Development"}
            ]},
            {title: "Cloud Development", icon: "cloud", list: [
                {title: "AWS implementation"},
                {title: "Machine Learning"},
                {title: "AI"},
                {title: "Serverless implementation"}
            ]},
            {title: "AI & Blockchain", icon: "connectdevelop", list: [
                {title: "one"},
                {title: "one"},
                {title: "one"},
                {title: "one"}
            ]},
            {title: "UI/UX Design", icon: "lightbulb-o", list: [
                {title: "one"},
                {title: "one"},
                {title: "one"},
                {title: "one"}
            ]},
            {title: "Product Strategy", icon: "gears", list: [
                {title: "one"},
                {title: "one"},
                {title: "one"},
                {title: "one"}
            ]},
            {title: "Business Consultancy", icon: "handshake-o", list: [
                {title: "one"},
                {title: "one"},
                {title: "one"},
                {title: "one"}
            ]},
            {title: "Digital Marketing", icon: "bar-chart", list: [
                {title: "one"},
                {title: "one"},
                {title: "one"},
                {title: "one"}
            ]}
        ];
    }
    public openList() {
        // $('#service-card-one').addClass('gradient-service-card');
        // $('#arrow-wrapper').removeClass('fa fa-chevron-down float-right').addClass('fa float-right fa-times');
        // $('#service-img-one').addClass('img-display-block');
        // $('#services-head').addClass('services-open-wrapper');
        // $('#service-list').addClass('mobile-list-open');
        $('#service-card-one').slideToggle();
    }
}