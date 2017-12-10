import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/app-home';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomTranslateLoader, defaultLangFunction } from './common/translate-loader';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MaterialModule } from './common/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StubComponent } from './components/dev-stub-component/app-stub.component';
import { Globals } from './globals';
import { GlobalsDev } from '../environment';
import { GlobalsProd } from '../environment.prod';
import { HeaderComponent } from './components/app-header/app-header.component';
import { LangSwitcherComponent } from './components/app-lang-swicher/app-lang-switcher.component';
import { ContactsComponent } from './components/app-contracts/app-contacts.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: 'admin', loadChildren: './lazy/lazy.module#LazyModule'},
    {path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        StubComponent,
        LangSwitcherComponent,
        ContactsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomTranslateLoader
            }
        }),
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
        BrowserModule.withServerTransition({appId: 'my-app'})
    ],
    providers: [
        Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
        Globals, GlobalsDev, GlobalsProd],
    bootstrap: [AppComponent]
})
export class AppModule {
}
