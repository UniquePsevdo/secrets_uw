import { Component } from '@angular/core';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor() {
        console.log('app component constructor');
    }
}
