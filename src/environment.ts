import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsDev {
    public environment: any;
    constructor() {
        this.environment = {
            production: false,
            apiUrl: 'http://localhost:3090/api',
            token_endpoint: '/login',
            refresh_endpoint: '/refresh',
            envName: 'dev'
        }
    }
}
