import { Injectable } from '@angular/core';
// todo: https://docs.google.com/spreadsheets/d/1Bbt5eliIFNm0PG-FV7L8LowiChaxPcpGYzZhuTGUg-8/edit#gid=337244462
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
