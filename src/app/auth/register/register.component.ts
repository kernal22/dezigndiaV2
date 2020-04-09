import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../_services/_auth/auth.service';

@Component({
    selector: "app-register",
    templateUrl: "register.component.html",
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    
    constructor(private _fb: FormBuilder, private _authService: AuthService) {

    }
    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.registerForm = this._fb.group({
            username: [],
            password: [],
            email: [],
            phone: []
        })
    }

    onRegister() {
        this._authService.onRegister(this.registerForm.value).subscribe(data => {

        }, error => {

        });
    }
}
