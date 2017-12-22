import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { HomeComponent } from '../components/app-home/app-home.component';
import { ContactsComponent } from '../components/app-contacts/app-contacts.component';

export const usersRoutes = [
        {path: '', component: HomeComponent, pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'contacts', component: ContactsComponent}
    ];

@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes),
        LocalizeRouterModule.forChild(usersRoutes)
    ],
    exports: [RouterModule, LocalizeRouterModule]
})
export class UsersRoutingModule {}
