import {Component, OnInit} from '@angular/core';
import Typed from 'typed.js';
import * as vivus from 'vivus';


@Component({
    selector: 'app-homepage-banner',
    templateUrl: './homepage-banner.component.html'
})
export class HomePageBannerComponent implements OnInit {
    public imageSources: Array<any>;
    constructor() {
        
    }
    ngOnInit() {
        const options = {
            strings: ["DESIGN", "DEVELOPMENT", "MARKETING"],
            typeSpeed: 30,
            backSpeed: 100,
            showCursor: true,
            cursorChar: '|',
            loop: true
        };
        const typed = new Typed('._deztite', options);
    }
}