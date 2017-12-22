import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule, LocalizeRouterSettings, LocalizeParser, ManualParserLoader } from 'localize-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { defaultLangFunction } from './common/translate-loader';
import { PublicGuard } from 'ngx-auth';

export const routes: Routes = [
    {path: 'admin', canActivate: [PublicGuard], loadChildren: './+admin-lazy/admin.module#AdminModule'}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        LocalizeRouterModule.forRoot(routes, {
            parser: {
                provide: LocalizeParser,
                useFactory: (translate, location, settings) =>
                    new ManualParserLoader(translate, location, settings, ['ua', 'en'], 'ROUTES'),
                deps: [TranslateService, Location, LocalizeRouterSettings]
            },
            alwaysSetPrefix: false,
            useCachedLang: false,
            defaultLangFunction: defaultLangFunction
        }),
    ],
    exports: [ RouterModule, LocalizeRouterModule ]
})
export class AppRoutingModule {}

