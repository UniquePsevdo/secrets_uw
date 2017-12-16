import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: 'app-register.component.html',
    styleUrls: [ 'app-register.component.scss' ]
})
export class RegisterComponent {
    signUpForm: FormGroup;

    constructor() {
        this.signUpForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    onSubmit () {
        /*this.authenticationService.register(this.signUpForm.value)
            .subscribe((response) => {
                    console.log('response: ', response);
                },
                (data) => {
                    this.errorService.handleError({title: data.error.error, message: data.error.error});
                }
            )*/
        console.log('test');
    };

}
