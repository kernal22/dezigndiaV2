import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlideshowModule} from 'ng-simple-slideshow';

import {WebLayoutModule} from '../layout/weblayout/webalyout.module';
import {ServiceModule} from './services/services.module';
import {ComponentModule} from '../components/components.module';

import {HomeComponent} from './home/home.component';
import {HomePageBannerComponent} from './home/homepage-banner/homepage-banner.component';
import {ServiceComponent} from './home/services/services.component';
import {PortfolioComponent} from './home/portfolio/portfolio.component';
import {TestimonialComponent} from './home/testimonials/testimonial.component';
import {ExperienceComponent} from './home/experience/experience.component';

import {routing} from './site.routing';

@NgModule({
    declarations: [
        HomeComponent,
        HomePageBannerComponent,
        ServiceComponent,
        PortfolioComponent,
        TestimonialComponent,
        ExperienceComponent
    ],
    exports: [
        HomeComponent,
        HomePageBannerComponent,
        ServiceComponent,
        PortfolioComponent,
        TestimonialComponent,
        ExperienceComponent
    ],
    imports: [
        CommonModule,
        routing,
        WebLayoutModule,
        SlideshowModule,
        ServiceModule,
        ComponentModule
    ],
    providers: [

    ]
})
export class SiteModule {

}