import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../components/app-admin/app-admin.component';


@Component({
    selector: 'app-lazy-view',
    template: ` <router-outlet></router-outlet>`
})
export class LazyComponent {
}

@NgModule({
    declarations: [LazyComponent, AdminComponent],
    imports: [
        RouterModule.forChild([
            {path: '', component: AdminComponent, pathMatch: 'full'}
        ])
    ]
})
export class LazyModule {

}
