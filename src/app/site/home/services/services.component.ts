import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

import {BoxInterface} from '../../../_models/box';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html'
})
export class ServiceComponent implements OnInit {
    public serviceList: Array<BoxInterface>;

    constructor() {
        
    }
    ngOnInit() {
        this.serviceList = [
            {title: "Mobile Development", icon: "mobile"},
            {title: "Web Development", icon: "laptop"},
            {title: "Cloud Development", icon: "cloud"},
            {title: "AI & Blockchain", icon: "connectdevelop"},
            {title: "UI/UX Design", icon: "lightbulb-o"},
            {title: "Product Strategy", icon: "gears"},
            {title: "Business Consultancy", icon: "handshake-o"},
            {title: "Digital Marketing", icon: "bar-chart"}
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