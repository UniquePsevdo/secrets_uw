import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../components/app-admin/app-admin.component';
import { AdminNavComponent } from '../components/app-admin/app-admin-nav-component';
import { LoginComponent } from '../components/app-admin/app-admin-login/app-login.component';
import { RegisterComponent } from '../components/app-admin/app-admin-register/app-register.component';
import { AuthenticationService } from '../data-services-admin/auth/authentication.service';
import { AdminInteractionData } from '../data-services-admin/admin-interaction-data';
import { AdminCabinetComponent } from '../components/app-admin/admin-content/app-admin-cabinet/app-admin-cabinet.component';
import { AdminShowroomComponent } from '../components/app-admin/admin-content/app-admin-showroom/app-admin-showroom.component';
import { AdminEventsComponent } from '../components/app-admin/admin-content/app-admin-events/app-admin-events.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModuleAdmin } from '../common/material.module.admin';
import { COMPOSITION_BUFFER_MODE, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_LABEL_GLOBAL_OPTIONS, MAT_OPTION_PARENT_COMPONENT, MAT_RIPPLE_GLOBAL_OPTIONS, MatOptgroup,
    MatOptionParentComponent, RippleGlobalOptions
} from '@angular/material';

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
    baseSpeedFactor: 1.5 // Ripples will animate 50% faster than before.
}

@NgModule({
    declarations: [ AdminComponent, AdminCabinetComponent, AdminShowroomComponent, AdminEventsComponent,
        LoginComponent, RegisterComponent, AdminNavComponent ],
    imports: [
        CommonModule,
        ReactiveFormsModule, FormsModule,
        AdminRoutingModule,
        MaterialModuleAdmin,
        TranslateModule
    ],
    providers: [
        AuthenticationService, AdminInteractionData, NgForm, MatOptgroup,
        {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig},
        {provide: COMPOSITION_BUFFER_MODE, useValue: false},
        {provide: MAT_OPTION_PARENT_COMPONENT, useClass: new InjectionToken<MatOptionParentComponent>('MAT_OPTION_PARENT_COMPONENT')},
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
    ]
})
export class AdminModule {
}

