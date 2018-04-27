import { Injectable } from '@angular/core';
// todo: https://docs.google.com/spreadsheets/d/1Bbt5eliIFNm0PG-FV7L8LowiChaxPcpGYzZhuTGUg-8/edit#gid=337244462
@Injectable()
export class GlobalsDev {
    public environment: any;
    constructor() {
        this.environment = {
            production: false,
            apiUrl: 'http://localhost:8081/api',
            token_endpoint: '/login',
            refresh_endpoint: '/refresh',
            envName: 'dev'
        }
    }
}
