import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UsersRoutingModule } from './users-routing.module';
/*import { HomeComponent } from '../components/app-home';*/
import { ContactsComponent } from '../components/app-contacts';
import { HeaderComponent } from '../components/app-header/app-header.component';
import { StubComponent } from '../components/dev-stub-component/app-stub.component';
import { MaterialModule } from '../common/material.module';
import { HomeComponent } from '../components/app-home/app-home.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
        UsersRoutingModule
    ],
    declarations: [
        HomeComponent,
        ContactsComponent,
        StubComponent,
        ContactsComponent
    ]
})
export class UsersModule { }
