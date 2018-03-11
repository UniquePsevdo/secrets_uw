import { Injectable } from '@angular/core';
import { GlobalsDev } from '../environment';
import { GlobalsProd } from '../environment.prod';
import { GlobalsProdTest } from '../environment.prod.test';

@Injectable()
export class Globals {
    static env: any;
    public environment: any;
    static setEnvironment (env) {
        this.env = env;
    }
    constructor(private globalsDev: GlobalsDev, private globalsProd: GlobalsProd, private globalsProdTest: GlobalsProdTest) {}
    setEnvData() {
        switch (Globals.env) {
            case 'dev':
                this.environment = this.globalsDev.environment;
                break;
            case 'prod-test':
                this.environment = this.globalsProdTest.environment;
                break;
            case 'prod':
                this.environment = this.globalsProd.environment;
        }
    }
}
