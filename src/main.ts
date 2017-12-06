require('./styless.scss');
import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Globals } from './app/globals';
Globals.setEnvironment('dev');

// Globals.
platformBrowserDynamic().bootstrapModule(AppModule);
