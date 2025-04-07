//import {bootstrapApplication} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {config, createProviders} from './app/app.config';
import {AppRoutingModule} from "./app";
import {BootstrapOptions, CompilerOptions, importProvidersFrom} from "@angular/core";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "./app/app.routes";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "@nx-20-ng-19/shared";
// bootstrapApplication(AppComponent, config).then(app => {
//     console.log('host application - bootstrapApplication', app);
// });


//import { AppModule } from './'


//  const x = platformBrowserDynamic().bootstrapModule(LazyLoadedComponent);

const o: BootstrapOptions = {}
const o1: CompilerOptions = {
    providers: [
        provideAnimations()
    ]
}

// @ts-ignore
platformBrowserDynamic().bootstrapModule(AppRoutingModule, o1)
    .catch(err => console.error('Error bootstrapping module:', err));
