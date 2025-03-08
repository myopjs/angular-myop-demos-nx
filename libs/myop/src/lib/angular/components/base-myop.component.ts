import {Component, inject, Injector, Type} from "@angular/core";
import {MyopExposeService} from "../services/myop-expose.service";

@Component({
    selector: 'myop-expose',
    template: ''
})
export class BaseMyopComponent{
    protected exposeService = inject(MyopExposeService);

    protected injector!     : Injector;
    protected componentType!: Type<any>;
    tagName!                : string;
}