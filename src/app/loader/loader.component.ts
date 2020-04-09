import {Component, OnInit, Input} from '@angular/core';
import {LoaderService} from '../_services/loader.service';

@Component({
    selector: "app-loader",
    templateUrl: "loader.component.html",
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

    public loading: boolean;
    @Input() color: string = '#7f58af'
    
    constructor(private _loaderService: LoaderService) {
        _loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        })
    }

    ngOnInit() {

    }
}