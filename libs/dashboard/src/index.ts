//import {DashboardComponent} from "./lib/dashboard/dashboard.component";
import {exposeAngularComponent} from "@nx-20-ng-19/myop";
import {Dashboard1Component} from "./lib/dashboard/dashboard1.component";
import {DashboardComponent} from "./lib/dashboard/dashboard.component";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {APP_BASE_HREF} from "@angular/common";

//export * from './lib/dashboard/dashboard.component';

//// Myop
// export * from './lib/dashboard/myop-dashboard.component';
// export * from './lib/dashboard/demos/myop-html-demo.component';
// export * from './lib/dashboard/demos/myop-container-cmp-demo.component';

const createStandaloneOptions = async () => {
    const [
        {importProvidersFrom},
        {provideAnimations},
        {provideHttpClient},
        {HttpClientInMemoryWebApiModule},
        {InMemoryDataService},
        {provideRouter},
        // {routes}
    ] = await Promise.all([
        import("@angular/core"),
        import("@angular/platform-browser/animations"),
        import("@angular/common/http"),
        import("angular-in-memory-web-api"),
        import("@nx-20-ng-19/shared"),
        import("@angular/router"),
        //  import("../../../apps/my-site/src/app/app.routes")
    ]);

    return {
        providers: [
            provideAnimations(),
            provideHttpClient(),
            importProvidersFrom(
                HttpClientInMemoryWebApiModule.forRoot(
                    InMemoryDataService, {dataEncapsulation: false}
                )
            ),
            // provideRouter(routes)
            provideRouter([]),
            {provide: APP_BASE_HREF, useValue: 'what/why'},
        ]
    }
}

// if (document.location.href.includes('dashboard.myop.dev')) {
// // expose for standalone usage :
//     exposeAngularComponent(DashboardComponent, 'myop-dashboard', null, createStandaloneOptions)
// }

//exposeAngularComponent(DashboardComponent, 'myop-dashboard').then();

debugger;
exposeAngularComponent(DashboardComponent, 'myop-dashboard-complex', createStandaloneOptions).then();
exposeAngularComponent(DashboardComponent, 'myop-dashboard', createStandaloneOptions).then();

//export * from "./lib/dashboard/dashboard.component";
