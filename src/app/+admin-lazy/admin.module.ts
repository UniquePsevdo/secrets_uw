import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../components/app-admin/app-admin.component';
import { AdminNavComponent } from '../components/app-admin/app-admin-nav-component';
import { LoginComponent } from '../components/app-admin/app-admin-login/app-login.component';
import { RegisterComponent } from '../components/app-admin/app-admin-register/app-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../data-services-admin/auth/authentication.service';
import { AdminInteractionData } from '../data-services-admin/admin-interaction-data';
import { AdminCabinetComponent } from '../components/app-admin/admin-content/app-admin-cabinet/app-admin-cabinet.component';
import { AdminShowroomComponent } from '../components/app-admin/admin-content/app-admin-showroom/app-admin-showroom.component';
import { AdminEventsComponent } from '../components/app-admin/admin-content/app-admin-events/app-admin-events.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModuleAdmin } from '../common/material.module.admin';

@NgModule({
    declarations: [ AdminComponent, AdminCabinetComponent, AdminShowroomComponent, AdminEventsComponent,
        LoginComponent, RegisterComponent, AdminNavComponent ],
    imports: [
        CommonModule,
        MaterialModuleAdmin,
        ReactiveFormsModule, FormsModule,
        TranslateModule,
        AdminRoutingModule
    ],
    providers: [
        AuthenticationService,
        AdminInteractionData
    ]
})
export class AdminModule {

}
