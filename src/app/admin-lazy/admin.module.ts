import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../components/app-admin/app-admin.component';
import { AdminNavComponent } from '../components/app-admin/app-admin-nav-component';
/*import { AuthenticationModule } from '../data-services-admin/auth/authentication.module';*/
import { LoginComponent } from '../components/app-admin/app-admin-login/app-login.component';
import { RegisterComponent } from '../components/app-admin/app-admin-register/app-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleAdmin } from '../common/material.module.admin';
import { AuthenticationService } from '../data-services-admin/auth/authentication.service';
import { AdminInteractionData } from '../data-services-admin/admin-interaction-data';
import { AdminCabinetComponent } from '../components/app-admin/admin-content/app-admin-cabinet/app-admin-cabinet.component';
import { AdminShowroomComponent } from '../components/app-admin/admin-content/app-admin-showroom/app-admin-showroom.component';
import { AdminEventsComponent } from '../components/app-admin/admin-content/app-admin-events/app-admin-events.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-admin',
    template: ` <router-outlet></router-outlet>`
})

export class LazyComponent {
}

@NgModule({
    declarations: [ AdminComponent, LazyComponent, AdminCabinetComponent, AdminShowroomComponent, AdminEventsComponent,
        LoginComponent, RegisterComponent, AdminNavComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule, FormsModule,
        MaterialModuleAdmin,
        TranslateModule,
        /*AuthenticationModule,*/
        RouterModule.forChild([
            {path: '', component: AdminComponent, pathMatch: 'full'},
            {path: 'cabinet', component: AdminCabinetComponent},
            {path: 'showroom', component: AdminShowroomComponent},
            {path: 'events', component: AdminEventsComponent}
        ])
    ],
    providers: [
        AuthenticationService,
        AdminInteractionData
    ]
})
export class AdminModule {

}
