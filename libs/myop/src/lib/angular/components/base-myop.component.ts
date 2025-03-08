import {Component, inject, Injector, Type} from "@angular/core";
import {MyopComponentExposeService} from "../services/myop-component-expose.service";

@Component({
    selector: 'myop-expose',
    template: ''
})
export class BaseMyopComponent{
    protected exposeService = inject(MyopComponentExposeService);

    protected injector!     : Injector;
    protected componentType!: Type<any>;
    tagName!                : string;
}