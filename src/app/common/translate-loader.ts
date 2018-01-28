import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';

// implements TranslateLoader
@Injectable()
export class CustomTranslateLoader implements TranslateLoader {

    constructor(public http: HttpClient, private globals: Globals ) {
        this.globals.setEnvData();
    }

    public getTranslation(lang: string): Observable<any> {
        console.log('getTranslation client ', lang);
        return this.http.get(`${this.globals.environment.apiUrl}/translations?language=${lang}`,
            {
                headers: new HttpHeaders().set('Accept-Language', lang),
            }
        )
    }
}

export function defaultLangFunction() {
    return 'ua';
}
