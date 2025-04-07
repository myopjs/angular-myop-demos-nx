import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponentTemp} from "./app/app.temp.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {routes} from "./app/app.routes";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "@nx-20-ng-19/shared";
import "@angular/compiler"
//import {  MyAwesomeButtonComponent } from 'my-awesome-button'
//import {  ContainerComponent } from '@myop/angular/dist/angular'

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
        }),

        RouterModule.forRoot(routes),
      //  ContainerComponent
    ],
    exports: [RouterModule],
    bootstrap: [
        AppComponentTemp
    ],
})
export class AppRoutingModule {

}
