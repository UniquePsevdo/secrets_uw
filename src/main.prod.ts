require('./styless.scss');
import './polyfills';
import { enableProdMode }         from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';
import { Globals } from './app/globals';
Globals.setEnvironment('prod');
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
