import { Injectable, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { RouterModule, Routes } from '@angular/router';
import * as fs from 'fs';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { defaultLangFunction } from './common/translate-loader';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
Globals.setEnvironment('prod');

@Injectable()
export class LocalizeUniversalLoader extends LocalizeParser {
    /**
     * Gets config from the server
     * @param routes
     */
    public load (routes: Routes): Promise<any> {
        return new Promise((resolve: any) => {
            let data: any = JSON.parse(fs.readFileSync( ( 'src/assets/locales.json'), 'utf8'));
            this.locales = data.locales;
            this.prefix = data.prefix;
            this.init(routes).then(resolve);
        });
    }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
    return new LocalizeUniversalLoader(translate, location, settings);
}

export class TranslateUniversalLoader implements TranslateLoader {
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string): Observable<any> {
        return Observable.create(observer => {
            observer.next(JSON.parse(fs.readFileSync(( 'src/assets/locales/' + lang + '.json'), 'utf8')));
            observer.complete();
        });
    }
}
export function translateLoaderFactory() {
    return new TranslateUniversalLoader();
}


@NgModule({
    imports: [TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: translateLoaderFactory
        }
    }),
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
        UsersModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent]
})
export class AppServerModule {
}
