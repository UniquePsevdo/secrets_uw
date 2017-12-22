import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { AdminComponent } from '../components/app-admin/app-admin.component';
import { AdminCabinetComponent } from '../components/app-admin/admin-content/app-admin-cabinet/app-admin-cabinet.component';

export const lazyRoutes = [
    {path: '', component: AdminComponent},
    {path: 'cabinet', component: AdminCabinetComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(lazyRoutes),
        LocalizeRouterModule.forChild(lazyRoutes)
    ],
    exports: [RouterModule, LocalizeRouterModule]
})
export class AdminRoutingModule {
}
