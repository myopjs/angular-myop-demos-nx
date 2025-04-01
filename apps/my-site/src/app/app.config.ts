import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {importProvidersFrom} from '@angular/core';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from '@nx-20-ng-19/shared';

export const createProviders = ()=>{
    return  [
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
    ];
}


export const config = {
    providers : createProviders()
};
//// Myop
//expose(DashboardComponent,'myop-dashboard',config);