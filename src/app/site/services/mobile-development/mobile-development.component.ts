import {Component, OnInit} from '@angular/core';
import {ChangeHeaderService} from '../../../_services/change-header.service';
import {BoxInterface} from '../../../_models/box';

@Component({
    selector: "app-android-development",
    templateUrl: "mobile-development.component.html"
})
export class AndroidDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;
    public timeline: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        this.serviceList = [
            {title: "Mobile Development", icon: "mobile" },
            {title: "Web Development", icon: "laptop" },
            {title: "Cloud Development", icon: "cloud" },
            {title: "AI & Blockchain", icon: "connectdevelop" },
            {title: "UI/UX Design", icon: "lightbulb-o" },
            {title: "Product Strategy", icon: "gears" },
            {title: "Business Consultancy", icon: "handshake-o" },
            {title: "Digital Marketing", icon: "bar-chart" }
        ];

        this.portfolia = [
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];

        this.timeline = [
            {badgeColoe: 'voilet', heading: 'Low Investment &amp; High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'},
            {badgeColoe: 'purple', heading: 'Multiple Sales Channels', text: 'Android apps can be deployed in various ways. One doesn’t need to depend on a single market but can use third-party application marketplace (especially in Google Android Market)'},
            {badgeColoe: 'voilet', heading: 'Low Investment &amp; High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'},
            {badgeColoe: 'purple', heading: 'Low Investment &amp; High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'}
        ]
    }
}


@Component({
    selector: "app-ionic-development",
    templateUrl: "ionic-development.component.html"
})
export class IonicDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        this.serviceList = [
            {title: "Mobile Development", icon: "mobile" },
            {title: "Web Development", icon: "laptop" },
            {title: "Cloud Development", icon: "cloud" },
            {title: "AI & Blockchain", icon: "connectdevelop" },
            {title: "UI/UX Design", icon: "lightbulb-o" },
            {title: "Product Strategy", icon: "gears" },
            {title: "Business Consultancy", icon: "handshake-o" },
            {title: "Digital Marketing", icon: "bar-chart" }
        ];

        this.portfolia = [
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];
    }
}



@Component({
    selector: "app-ios-development",
    templateUrl: "ios-development.component.html"
})
export class IosDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        this.serviceList = [
            {title: "Mobile Development", icon: "mobile" },
            {title: "Web Development", icon: "laptop" },
            {title: "Cloud Development", icon: "cloud" },
            {title: "AI & Blockchain", icon: "connectdevelop" },
            {title: "UI/UX Design", icon: "lightbulb-o" },
            {title: "Product Strategy", icon: "gears" },
            {title: "Business Consultancy", icon: "handshake-o" },
            {title: "Digital Marketing", icon: "bar-chart" }
        ];

        this.portfolia = [
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];
    }
}



@Component({
    selector: "app-react-native-development",
    templateUrl: "react-native-development.component.html"
})
export class ReactNativeDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        this.serviceList = [
            {title: "Mobile Development", icon: "mobile" },
            {title: "Web Development", icon: "laptop" },
            {title: "Cloud Development", icon: "cloud" },
            {title: "AI & Blockchain", icon: "connectdevelop" },
            {title: "UI/UX Design", icon: "lightbulb-o" },
            {title: "Product Strategy", icon: "gears" },
            {title: "Business Consultancy", icon: "handshake-o" },
            {title: "Digital Marketing", icon: "bar-chart" }
        ];

        this.portfolia = [
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '"img/technologypages/mokibg.png"', logo: '"img/technologypages/mokilogo.png"', heading: 'MOKI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];
    }
}