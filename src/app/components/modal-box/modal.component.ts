import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'modal-box',
    templateUrl: 'modal-component.html'
})
export class ModalComponent {
    public contactForm: FormGroup;

    public contact = {};
    
    constructor(private _fb: FormBuilder) {

    }
    ngOnInit() {
        // this.createForm();
    }

    submitForm(form) {
        console.log(form.value);
    }

}