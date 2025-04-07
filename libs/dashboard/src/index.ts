import {exposeAngularComponent} from "@myop/angular-remote"
import {DashboardComponent} from './lib/dashboard/dashboard.component';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";
import {routes} from "../../../apps/my-site/src/app/app.routes";
import {importProvidersFrom} from "@angular/core";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "@nx-20-ng-19/shared";

export const config = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideRouter(routes),
        importProvidersFrom(
            // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
            // and returns simulated server responses.
            // Remove it when a real server is ready to receive requests.
            HttpClientInMemoryWebApiModule.forRoot(
                InMemoryDataService, {dataEncapsulation: false}
            )
        ),
    ]
};

exposeAngularComponent(DashboardComponent, 'myop-dashboard', async () => {
    return config;
}).then();


export * from './lib/dashboard/dashboard.component';

//// Myop
export * from './lib/dashboard/myop-dashboard.component';
export * from './lib/dashboard/demos/myop-html-demo.component';
export * from './lib/dashboard/demos/myop-container-cmp-demo.component';
