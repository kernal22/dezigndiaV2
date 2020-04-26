import {Component, OnInit} from '@angular/core';
import {ChangeHeaderService} from '../../../_services/change-header.service';
import {BoxInterface} from '../../../_models/box';

@Component({
    selector: "app-android-development",
    templateUrl: "android-development.component.html"
})
export class AndroidDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;
    public timeline: Array<any>;
    public companybox: Array<any>;
    public blogbox: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        // this.serviceList = [
        //     {title: "Mobile Development", icon: "mobile" },
        //     {title: "Web Development", icon: "laptop" },
        //     {title: "Cloud Development", icon: "cloud" },
        //     {title: "AI & Blockchain", icon: "connectdevelop" },
        //     {title: "UI/UX Design", icon: "lightbulb-o" },
        //     {title: "Product Strategy", icon: "gears" },
        //     {title: "Business Consultancy", icon: "handshake-o" },
        //     {title: "Digital Marketing", icon: "bar-chart" }
        // ];

        this.portfolia = [
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C2.svg', heading: 'RENT MY STAY', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C1.svg', heading: 'SHIP ROCKET', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C3.svg', heading: 'CAMPUS SPACE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C4.svg', heading: 'RELIANCE SELFi', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C5.svg', heading: 'BIZOM RETAIL AI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C6.svg', heading: 'HANGRR STORE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];

        this.timeline = [
            {badgeColoe: 'voilet', heading: 'Open Source Technology', text: 'Architecture of Android SDK is open-source which means you can actually interact with the community for the upcoming expansions of android mobile application development'},
            {badgeColoe: 'purple', heading: 'Multi-network distribution', text: 'Android apps can be deployed in various ways. One doesn’t need to depend on a single market but can use third-party application marketplace (especially in Google Android Market)'},
            {badgeColoe: 'voilet', heading: 'Easily Adoptable Technology', text: 'Android applications are scripted in Java language with the help of a rich set of libraries hence any Java developer can build Android applications making it very easy to adopt'},
            {badgeColoe: 'purple', heading: 'Low Investment & High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'}
        ];

        this.companybox = [
            {content: 'Hangout' , source: '../assets/img/company/logo1.svg' , desc: 'A google product, widely used for realtime chat & video conferencing'},
            {content: 'Audible' , source: '../assets/img/company/logo2.svg' , desc: 'An Amazon product, gives you access to millions of audiobooks'},
            {content: 'Google Pay' , source: '../assets/img/company/logo3.svg' , desc: 'A Google payment product, enables you to pay directly to your bank account'},
            {content: 'Play Music' , source: '../assets/img/company/logo4.svg' , desc: 'Google music application, gives acess to millions of latest tracks'}
        ];

        this.blogbox = [
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 1'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 2'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 3'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 4'}
        ];
    }
}


@Component({
    selector: "app-ionic-development",
    templateUrl: "ionic-development.component.html"
})
export class IonicDevelopmentComponent implements OnInit {

    public serviceList: Array<BoxInterface>;
    public portfolia: Array<any>;
    public timeline: Array<any>;
    public companybox: Array<any>;
    public blogbox: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        // this.serviceList = [
        //     {title: "Mobile Development", icon: "mobile" },
        //     {title: "Web Development", icon: "laptop" },
        //     {title: "Cloud Development", icon: "cloud" },
        //     {title: "AI & Blockchain", icon: "connectdevelop" },
        //     {title: "UI/UX Design", icon: "lightbulb-o" },
        //     {title: "Product Strategy", icon: "gears" },
        //     {title: "Business Consultancy", icon: "handshake-o" },
        //     {title: "Digital Marketing", icon: "bar-chart" }
        // ];

        this.portfolia = [
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C2.svg', heading: 'RENT MY STAY', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C1.svg', heading: 'SHIP ROCKET', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C3.svg', heading: 'CAMPUS SPACE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C4.svg', heading: 'RELIANCE SELFi', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C5.svg', heading: 'BIZOM RETAIL AI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C6.svg', heading: 'HANGRR STORE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];

        this.timeline = [
            {badgeColoe: 'voilet', heading: 'Open Source Technology', text: 'Architecture of Android SDK is open-source which means you can actually interact with the community for the upcoming expansions of android mobile application development'},
            {badgeColoe: 'purple', heading: 'Multi-network distribution', text: 'Android apps can be deployed in various ways. One doesn’t need to depend on a single market but can use third-party application marketplace (especially in Google Android Market)'},
            {badgeColoe: 'voilet', heading: 'Easily Adoptable Technology', text: 'Android applications are scripted in Java language with the help of a rich set of libraries hence any Java developer can build Android applications making it very easy to adopt'},
            {badgeColoe: 'purple', heading: 'Low Investment & High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'}
        ];

        this.companybox = [
            {content: 'Hangout' , source: '../assets/img/company/logo1.svg' , desc: 'A google product, widely used for realtime chat & video conferencing'},
            {content: 'Audible' , source: '../assets/img/company/logo2.svg' , desc: 'An Amazon product, gives you access to millions of audiobooks'},
            {content: 'Google Pay' , source: '../assets/img/company/logo3.svg' , desc: 'A Google payment product, enables you to pay directly to your bank account'},
            {content: 'Play Music' , source: '../assets/img/company/logo4.svg' , desc: 'Google music application, gives acess to millions of latest tracks'}
        ];

        this.blogbox = [
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 1'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 2'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 3'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 4'}
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
    public timeline: Array<any>;
    public companybox: Array<any>;
    public blogbox: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        // this.serviceList = [
        //     {title: "Mobile Development", icon: "mobile" },
        //     {title: "Web Development", icon: "laptop" },
        //     {title: "Cloud Development", icon: "cloud" },
        //     {title: "AI & Blockchain", icon: "connectdevelop" },
        //     {title: "UI/UX Design", icon: "lightbulb-o" },
        //     {title: "Product Strategy", icon: "gears" },
        //     {title: "Business Consultancy", icon: "handshake-o" },
        //     {title: "Digital Marketing", icon: "bar-chart" }
        // ];

        this.portfolia = [
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C2.svg', heading: 'RENT MY STAY', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C1.svg', heading: 'SHIP ROCKET', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C3.svg', heading: 'CAMPUS SPACE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C4.svg', heading: 'RELIANCE SELFi', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C5.svg', heading: 'BIZOM RETAIL AI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C6.svg', heading: 'HANGRR STORE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];

        this.timeline = [
            {badgeColoe: 'voilet', heading: 'Open Source Technology', text: 'Architecture of Android SDK is open-source which means you can actually interact with the community for the upcoming expansions of android mobile application development'},
            {badgeColoe: 'purple', heading: 'Multi-network distribution', text: 'Android apps can be deployed in various ways. One doesn’t need to depend on a single market but can use third-party application marketplace (especially in Google Android Market)'},
            {badgeColoe: 'voilet', heading: 'Easily Adoptable Technology', text: 'Android applications are scripted in Java language with the help of a rich set of libraries hence any Java developer can build Android applications making it very easy to adopt'},
            {badgeColoe: 'purple', heading: 'Low Investment & High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'}
        ];

        this.companybox = [
            {content: 'Hangout' , source: '../assets/img/company/logo1.svg' , desc: 'A google product, widely used for realtime chat & video conferencing'},
            {content: 'Audible' , source: '../assets/img/company/logo2.svg' , desc: 'An Amazon product, gives you access to millions of audiobooks'},
            {content: 'Google Pay' , source: '../assets/img/company/logo3.svg' , desc: 'A Google payment product, enables you to pay directly to your bank account'},
            {content: 'Play Music' , source: '../assets/img/company/logo4.svg' , desc: 'Google music application, gives acess to millions of latest tracks'}
        ];

        this.blogbox = [
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 1'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 2'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 3'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 4'}
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
    public timeline: Array<any>;
    public companybox: Array<any>;
    public blogbox: Array<any>;

    constructor(private _changeHeader: ChangeHeaderService) {

    }
    ngOnInit() {

        this._changeHeader._changeBannerContent();

        // this.serviceList = [
        //     {title: "Mobile Development", icon: "mobile" },
        //     {title: "Web Development", icon: "laptop" },
        //     {title: "Cloud Development", icon: "cloud" },
        //     {title: "AI & Blockchain", icon: "connectdevelop" },
        //     {title: "UI/UX Design", icon: "lightbulb-o" },
        //     {title: "Product Strategy", icon: "gears" },
        //     {title: "Business Consultancy", icon: "handshake-o" },
        //     {title: "Digital Marketing", icon: "bar-chart" }
        // ];

        this.portfolia = [
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C2.svg', heading: 'RENT MY STAY', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C1.svg', heading: 'SHIP ROCKET', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C3.svg', heading: 'CAMPUS SPACE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C4.svg', heading: 'RELIANCE SELFi', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C5.svg', heading: 'BIZOM RETAIL AI', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."},
            {banner: '../assets/img/portfolio/banner.svg', logo: '../assets/img/portfolio/C6.svg', heading: 'HANGRR STORE', note: "Through MOKI, you can order a variety of homemade delicacies prepared by our homemakers in their very own 7kitchen. Fresh, Healthy, and Hygienic."}
        ];

        this.timeline = [
            {badgeColoe: 'voilet', heading: 'Open Source Technology', text: 'Architecture of Android SDK is open-source which means you can actually interact with the community for the upcoming expansions of android mobile application development'},
            {badgeColoe: 'purple', heading: 'Multi-network distribution', text: 'Android apps can be deployed in various ways. One doesn’t need to depend on a single market but can use third-party application marketplace (especially in Google Android Market)'},
            {badgeColoe: 'voilet', heading: 'Easily Adoptable Technology', text: 'Android applications are scripted in Java language with the help of a rich set of libraries hence any Java developer can build Android applications making it very easy to adopt'},
            {badgeColoe: 'purple', heading: 'Low Investment & High ROI', text: 'Android provides freely its Software Development Kit (SDK) to the developer community which minimizes the development and licensing costs.'}
        ];

        this.companybox = [
            {content: 'Hangout' , source: '../assets/img/company/logo1.svg' , desc: 'A google product, widely used for realtime chat & video conferencing'},
            {content: 'Audible' , source: '../assets/img/company/logo2.svg' , desc: 'An Amazon product, gives you access to millions of audiobooks'},
            {content: 'Google Pay' , source: '../assets/img/company/logo3.svg' , desc: 'A Google payment product, enables you to pay directly to your bank account'},
            {content: 'Play Music' , source: '../assets/img/company/logo4.svg' , desc: 'Google music application, gives acess to millions of latest tracks'}
        ];

        this.blogbox = [
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 1'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 2'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 3'},
            {source: '../assets/img/blog/b1.png' , desc: 'Blog 4'}
        ];
    }
}