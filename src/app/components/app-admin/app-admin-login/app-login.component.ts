import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../data-services-admin/auth/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: 'app-login.component.html',
    styleUrls: ['app-login.component.scss']
})
export class LoginComponent {
    signInForm: FormGroup;
    constructor(private authenticationService: AuthenticationService) {
        this.signInForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        this.authenticationService.login(this.signInForm.value)
            .subscribe((data) => {
                    if (data) {
                        console.log(data);
                    }
                    this.authenticationService.isAuthorized();
                },
                (err) => {
                    console.log(err);
                }
            )
    };
}
