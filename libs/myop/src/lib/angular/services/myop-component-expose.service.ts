import {Injectable, Injector, Type} from "@angular/core";
import {exposeAngularComponent} from "../exposeAngularComponent";

/*
* Expose Angular component to Myop admin.
* */
@Injectable({providedIn: 'root'})
export class MyopComponentExposeService {

    expose(component: Type<any>, tagName: string, injector: Injector) {
        exposeAngularComponent(component, tagName, injector);
    }
}