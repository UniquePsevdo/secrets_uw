import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { GlobalsDev } from '../environment';
import { GlobalsProd } from '../environment.prod';

@Injectable()
export class Globals {
    static env: any;
    public environment: any;
    static setEnvironment (env) {
        this.env = env;
    }
    constructor(private globalsDev: GlobalsDev, private globalsProd: GlobalsProd) {}
    setEnvData() {
        if (Globals.env === 'prod') {
            this.environment = this.globalsProd.environment;
        } else {
            this.environment = this.globalsDev.environment;
        }
    }
}
