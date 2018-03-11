import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProd {
    public environment: any;
    constructor() {
        this.environment = {
            production: true,
            apiUrl: 'http://ukrainesecret.com/api',
            token_endpoint: '/login',
            refresh_endpoint: '/refresh',
            envName: 'prod'
        }
    }
}
