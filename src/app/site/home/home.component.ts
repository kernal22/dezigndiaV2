import {Component, OnInit} from '@angular/core';
import {ChangeHeaderService} from '../../_services/change-header.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public imageSources: Array<any>;
    constructor(private _chnageHeader: ChangeHeaderService) {
        
    }
    ngOnInit() {
        this._chnageHeader._changeBannerContent();
    }
}