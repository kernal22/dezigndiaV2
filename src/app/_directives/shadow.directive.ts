import {ElementRef, Directive, Input, Renderer2, OnInit} from '@angular/core';

@Directive({
    selector: 'app-shadow'
})
export class ShadowDirective implements OnInit{
    @Input() appShadow: string;
    @Input() appShadowX: string;
    @Input() appShadowY: string;
    @Input() appShadowBlur: string;

    constructor(private eleRef: ElementRef, private renderer2: Renderer2) {

    }

    ngOnInit() {
        let shadowProperty = `${this.appShadow} ${this.appShadowX} ${this.appShadowY} ${this.appShadowBlur}`;
        this.renderer2.setStyle(this.eleRef.nativeElement, 'box-shadow', shadowProperty);
    }
}