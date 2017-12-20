import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminInteractionData {
    private showContentChildren: BehaviorSubject<any>;
    showContentChildren$: Observable<any>;

    private selectedTabIndex: BehaviorSubject<any>;
    selectedTabIndex$: Observable<any>;

    constructor() {
        this.showContentChildren = new BehaviorSubject<any>(false);
        this.showContentChildren$ = this.showContentChildren.asObservable();

        this.selectedTabIndex = new BehaviorSubject<any>(0);
        this.selectedTabIndex$ = this.selectedTabIndex.asObservable();
    }

    setShowContentChildren(showContentChildren) {
        this.showContentChildren.next(showContentChildren);
    }

    setActiveTab(index) {
        this.selectedTabIndex.next(index);
    }

}
