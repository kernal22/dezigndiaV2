import {Injectable} from '@angular/core';
import {MainMenuItem} from '../_models/menu';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class MenuService {
    public menuItem: Array<MainMenuItem>;
    public footerMenuItem: Array<MainMenuItem>;
    public socialMedia: Array<any>;

    constructor() {
        this.menuItem = [
            { name: "Home", title: "Home", type: "link", path: "/home" },
            { name: "About Us", title: "About Us", type: "link", path: "/service/mobile-developement" },
            { name: "Our process", title: "Our process", type: "link", path: "/about-us" },
            { name: "Service", title: "Service", type: "sub",
                children: [
                    {name: "Mobile Development", title: "Mobile Development", path: "/about-us"},
                    {name: "Web Development", title: "Web Development", path: "/about-us" },
                    {name: "Product Strategy", title: "Product Strategy", path: "/about-us" },
                    {name: "Digital Marketing", title: "Digital Marketing", path: "/about-us" }
                ]
            },
            { name: "Our Work", title: "Our Work", type: "link", path: "/about-us" },
            { name: "Resources", title: "Resources", type: "sub",
                children: [
                    {name: "Blog", title: "Blog", path: "/blog"},
                    {name: "Blog", title: "Blog", path: "/blog"},
                    {name: "Blog", title: "Blog", path: "/blog"}
                ]
            },
            { name: "contact us", title: "contact us", type: "link", path: "/about-us" },
            // { name: "Category", title: "Category", type: "sub",
            //     children: [
            //         { name: "Category 1", title: "Category 1", path: "/category-1" },
            //         { name: "Category 2", title: "Category 2", path: "/category-2" },
            //         { name: "Category 3", title: "Category 3", path: "/category-3" }
            //     ]
            // },
            // { name: "Blog Post", title: "Blog Post", type: "link", path: "/blog-posts" },
            // { name: "Contact Us", title: "Contact Us", type: "link", path: "/contact-us" }
        ];
        this.footerMenuItem = [
            { name: "Privacy Policy", title: "Privacy Policy", type: "link" },
            { name: "Support", title: "Support", type: "link" },
            { name: "Contact", title: "Contact", type: "link" },
            { name: "About", title: "About", type: "link" },
            { name: "Terms", title: "Terms", type: "link" },
            { name: "category", title: "category", type: "link" }
        ];
        this.socialMedia = [
            {mediaLink: "https://www.facebook.com/dezigndia", iconPath: "assets/img/footer/facebook-letter-logo.svg", alt: "Dezigndia Facebook"},
            {mediaLink: "https://www.youtube.com/channel/UCaebOX_04Pwfd5_wwXJETuw", iconPath: "assets/img/footer/youtube.svg", alt: "Dezigndia Youtube"},
            {mediaLink: "https://www.instagram.com/dezigndia", iconPath: "assets/img/footer/instagram.svg", alt: "Dezigndia Instagram"},
            {mediaLink: "https://in.linkedin.com/company/dezigndia", iconPath: "assets/img/footer/linkedin-logo.svg", alt: "Dezigndia Instagram"},
            {mediaLink: "https://www.pinterest.com/dezigndiadesigns", iconPath: "assets/img/footer/pintrest-logo.png", alt: "Dezigndia Pinterest"},
            {mediaLink: "https://twitter.com/dezigndia", iconPath: "assets/img/footer/twitter.png", alt: "Dezigndia Twitter"},
        ]
        
    }

    public getMenuItems(): Observable<any> {
        return of(this.menuItem);
    }
    public getFooterMenuItems(): Observable<any> {
        return of(this.footerMenuItem);
    }
    public getSocialMedia(): Observable<any> {
        return of(this.socialMedia);
    }
}
