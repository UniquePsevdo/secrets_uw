import './styles';
import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Globals } from './app/globals';
Globals.setEnvironment('dev');
platformBrowserDynamic().bootstrapModule(AppModule);
