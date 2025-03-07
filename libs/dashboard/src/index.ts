import { DashboardComponent } from './lib/dashboard/dashboard.component';
import { expose, InMemoryDataService } from '@nx-20-ng-19/shared';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export * from './lib/dashboard/dashboard.component';


//// Myop
//// Expose to Myop
// expose(DashboardComponent,'myop-dashboard',{
//   providers : [
//     provideAnimations(),
//     provideHttpClient(),
//     provideRouter([]),
//     importProvidersFrom(
//       // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
//       // and returns simulated server responses.
//       // Remove it when a real server is ready to receive requests.
//       HttpClientInMemoryWebApiModule.forRoot(
//         InMemoryDataService, { dataEncapsulation: false }
//       )
//     )
//   ]
// });
export * from './lib/dashboard/myop-dashboard.component';
