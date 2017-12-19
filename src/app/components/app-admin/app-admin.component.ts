import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../data-services-admin/auth/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import { AdminInteractionData } from '../../data-services-admin/admin-interaction-data';

@Component({
    selector: 'app-admin',
    templateUrl: 'app-admin.component.html',
    styleUrls: ['app-admin.component.scss']
})
export class AdminComponent implements OnDestroy {
    showContentChildren: boolean;
    isLoggedIn: boolean;
    isLoggedInSubscription: Subscription;
    childContentSubscription: Subscription;

    constructor(public authenticationService: AuthenticationService, private dataService: AdminInteractionData) {
        this.isLoggedInSubscription = this.authenticationService.isLoggedIn$.subscribe((value) => {
            console.log('isLoggedInSubscription ', value);
            this.isLoggedIn = value;
        });
        this.childContentSubscription = this.dataService.showContentChildren$.subscribe((data) => {
            this.showContentChildren = data;
        });

    }

    ngOnDestroy (): void {
        this.isLoggedInSubscription.unsubscribe();
        this.childContentSubscription.unsubscribe();
    }

    logout() {
        this.authenticationService.logout();
        this.dataService.setShowContentChildren(false);
    }
}
