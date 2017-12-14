import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../components/app-admin/app-admin.component';
import { AuthenticationModule } from '../data-services-admin/auth/authentication.module';
import { LoginComponent } from '../components/app-admin/app-login/app-login.component';
import { RegisterComponent } from '../components/app-admin/app-register/app-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleAdmin } from '../common/material.module.admin';

@Component({
    selector: 'app-admin',
    template: ` <router-outlet></router-outlet>`
})
export class LazyComponent {
}

@NgModule({
    declarations: [ AdminComponent, LazyComponent, LoginComponent, RegisterComponent],
    imports: [
        BrowserModule,
        MaterialModuleAdmin,
        AuthenticationModule,
        ReactiveFormsModule, FormsModule,
        RouterModule.forChild([
            {path: '', component: AdminComponent, pathMatch: 'full'}
        ])
    ]
})
export class AdminModule {

}
