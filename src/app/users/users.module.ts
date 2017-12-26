import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UsersRoutingModule } from './users-routing.module';
import { ContactsComponent } from '../components/app-contacts';
import { StubComponent } from '../components/dev-stub-component/app-stub.component';
import { HomeComponent } from '../components/app-home/app-home.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
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
