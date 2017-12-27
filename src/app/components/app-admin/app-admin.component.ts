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
    selectedTabSubscription: Subscription;
    selectedTabIndex: number;

    constructor(public authenticationService: AuthenticationService, public adminDataService: AdminInteractionData) {
        this.isLoggedInSubscription = this.authenticationService.isLoggedIn$.subscribe((value) => {
            this.isLoggedIn = value;
        });
        this.childContentSubscription = this.adminDataService.showContentChildren$.subscribe((data) => {
            this.showContentChildren = data;
        });
        this.selectedTabSubscription = this.adminDataService.selectedTabIndex$.subscribe((index) => {
            this.selectedTabIndex = index;
        });

    }

    ngOnDestroy () {
        if (this.isLoggedInSubscription) {
            this.isLoggedInSubscription.unsubscribe();
        }
        if (this.childContentSubscription) {
            this.childContentSubscription.unsubscribe();
        }
        if (this.selectedTabSubscription) {
            this.selectedTabSubscription.unsubscribe();
        }
    }

    logout() {
        this.authenticationService.logout();
        this.adminDataService.setShowContentChildren(false);
        this.adminDataService.setActiveTab(0);
    }
}
