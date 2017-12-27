import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../data-services-admin/auth/authentication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-login',
    templateUrl: 'app-login.component.html',
    styleUrls: [ 'app-login.component.scss' ]
})
export class LoginComponent implements OnDestroy {
    signInForm: FormGroup;
    loginSubscription: Subscription;

    constructor (public authenticationService: AuthenticationService) {
        this.signInForm = new FormGroup({
            'email': new FormControl(null, [ Validators.required, Validators.email ]),
            'password': new FormControl(null, Validators.required)
        });
    }

    onSubmit () {
        this.loginSubscription = this.authenticationService.login(this.signInForm.value)
            .subscribe((data) => {
                    this.authenticationService.checkIfLoggedIn();
                },
                (err) => {
                    this.authenticationService.checkIfLoggedIn();
                    console.log(err);
                }
            )
    };

    ngOnDestroy () {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }
}
