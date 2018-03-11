import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProdTest {
    public environment: any;
    constructor() {
        this.environment = {
            production: true,
            apiUrl: 'http://secrets.us-east-1.elasticbeanstalk.com/api',
            token_endpoint: '/login',
            refresh_endpoint: '/refresh',
            envName: 'prod-test'
        }
    }
}
