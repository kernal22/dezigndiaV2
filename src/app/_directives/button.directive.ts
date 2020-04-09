import {Directive, Input, Renderer2, HostListener, ElementRef, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject, Subscription } from 'rxjs';


/**
 * @description this directive will make the button color which is passed from component also makes the button disable once it get clicked. Also click event is handled from here on button click it will subscribe the the click event and emit with submitData event.
 */
@Directive({
    selector: "btnHighlight"
})
export class ButtonDirective implements OnInit {

    @Input() bgColor: string;
    @Output() submitData: EventEmitter<any> = new EventEmitter();
    private click: Subject<any>;
    private subscription: Subscription;

    constructor(private renderer: Renderer2, private eleRef: ElementRef) {

    }

    ngOnInit() {
        this.renderer.setStyle(this.eleRef.nativeElement, 'backgroundColor', this.bgColor);
        this.subscription = this.click.subscribe((e) => {
            this.submitData.emit(e);
        })
    }

    @HostListener('click', ['$event'])
    onclick($event) {
        this.renderer.setProperty(this.eleRef.nativeElement, 'disabled', true);
        this.renderer.setProperty(this.eleRef.nativeElement, 'cursor', 'not-allowed');
        this.click.next($event);
    }
}