import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminInteractionData {
    private showContentChildren: BehaviorSubject<any>;
    showContentChildren$: Observable<any>;

    constructor() {
        this.showContentChildren = new BehaviorSubject<any>(false);
        this.showContentChildren$ = this.showContentChildren.asObservable();
    }

    setShowContentChildren(showContentChildren) {
        this.showContentChildren.next(showContentChildren);
    }

}
