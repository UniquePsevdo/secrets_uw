import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CustomTranslateLoader } from './common/translate-loader';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MaterialModule } from './common/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from './globals';
import { GlobalsDev } from '../environment';
import { GlobalsProd } from '../environment.prod';
import { AuthenticationModule } from './data-services-admin/auth/authentication.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/app-header/app-header.component';
import { LangSwitcherComponent } from './components/app-lang-swicher/app-lang-switcher.component';
import { MaterialModuleAdmin } from './common/material.module.admin';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LangSwitcherComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        MaterialModuleAdmin,
        AuthenticationModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomTranslateLoader
            }
        }),
        UsersModule,
        AppRoutingModule,
        BrowserModule.withServerTransition({appId: 'my-app'}),
    ],
    providers: [
        PublicGuard, ProtectedGuard,
        Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
        Globals, GlobalsDev, GlobalsProd],
    bootstrap: [AppComponent]
})
export class AppModule {
}
