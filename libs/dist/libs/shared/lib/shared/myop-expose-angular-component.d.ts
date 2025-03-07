import { EnvironmentInjector, Type } from '@angular/core';
import 'zone.js';
import { ApplicationConfig } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class MyopExposeService {
    protected injector: EnvironmentInjector;
    expose(component: Type<any>, tagName: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyopExposeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MyopExposeService>;
}
export declare const expose: (component: Type<any>, tagName: string, appConfig?: ApplicationConfig) => void;
