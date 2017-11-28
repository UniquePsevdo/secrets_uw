import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsDev {
    public environment: any;
    constructor() {
        this.environment = {
            apiUrl: 'http://localhost:3090/api',
            production: false
        }
    }
}
