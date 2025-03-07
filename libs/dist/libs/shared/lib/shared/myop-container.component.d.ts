import { ElementRef } from '@angular/core';
import { IUserFlow } from '@myop/sdk/common';
import { HostSDK } from '@myop/sdk/dist/module/host/hostSDK';
import { IMyopComponent } from '@myop/sdk/host';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
export declare class MyopContainerComponent {
    protected route: ActivatedRoute;
    routeData: import("@angular/core").Signal<{
        flowId: string;
        componentId: string;
    } | undefined>;
    myopContainer: import("@angular/core").Signal<ElementRef<HTMLDivElement> | undefined>;
    injector: import("@angular/core").InputSignal<any>;
    _flowId: import("@angular/core").InputSignal<string>;
    flowId: import("@angular/core").WritableSignal<string>;
    _componentId: import("@angular/core").InputSignal<string>;
    componentId: import("@angular/core").WritableSignal<string>;
    inputs: import("@angular/core").InputSignal<{
        [key: string]: any;
    } | undefined>;
    componentReady: import("@angular/core").OutputEmitterRef<IMyopComponent<any, any>>;
    static loading?: Promise<void>;
    static isLoaded: boolean;
    static userFlows: Record<string, Promise<IUserFlow>>;
    static hostSDK?: HostSDK;
    constructor();
    static ready(): Promise<void>;
    load(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MyopContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MyopContainerComponent, "myop-container", never, { "injector": { "alias": "injector"; "required": false; "isSignal": true; }; "_flowId": { "alias": "flowId"; "required": false; "isSignal": true; }; "_componentId": { "alias": "componentId"; "required": false; "isSignal": true; }; "inputs": { "alias": "inputs"; "required": false; "isSignal": true; }; }, { "componentReady": "componentReady"; }, never, ["*", "[error]"], true, never>;
}
