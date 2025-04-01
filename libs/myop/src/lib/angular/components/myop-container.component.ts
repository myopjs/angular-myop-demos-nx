import {
    Component,
    EnvironmentInjector,
    ComponentFactoryResolver,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    output,
    viewChild,
    ViewChild,
    ViewContainerRef,
    createComponent,
    Type,
    runInInjectionContext,
    ApplicationRef, Injector
} from '@angular/core';
import {hostSDK, IMyopComponent} from '@myop/sdk/host';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {IUserFlow} from "@myop/sdk/common";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {createProviders} from "../../../../../../apps/my-site/src/app/app.config";

export class CloudRepository {
    static userFlows: Record<string, Promise<IUserFlow>> = {};

    async fetch(flowId: string) {
        if (!CloudRepository.userFlows[flowId]) {
            // eslint-disable-next-line no-async-promise-executor
            CloudRepository.userFlows[flowId] = new Promise(async (resolve, reject) => {
                try {
                    const res = await fetch(`https://cloud.myop.dev/flow?id=${flowId}&resolve=components`);
                    const json = await res.json();
                    resolve(json.item);
                } catch (e) {
                    reject(e)
                }
            });
        }

        return await CloudRepository.userFlows[flowId];
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'myop-container',
    standalone: true,
    template: `
        <div #myopContainer>
            <ng-content>
                <!--  Not Loaded-->
            </ng-content>
            <ng-content select="[error]">
            </ng-content>
        </div>


        <!--        <button (click)="renderDynamicComponents();">test</button>-->
        <div #lazyComponent>

        </div>  <!-- Placeholder for the lazy-loaded component -->
    `
})
export class MyopContainerComponent {

    protected environmentInjector = inject(EnvironmentInjector);
    //protected ComponentFactoryResolver2 = inject(ComponentFactoryResolver);

    protected route = inject(ActivatedRoute);
    routeData = toSignal<{ flowId: string, componentId: string }>(this.route.data as any);

    //// View children
    myopContainer = viewChild<ElementRef<HTMLDivElement>>('myopContainer');

    //// INPUTS
    _flowId = input<string>('', {alias: 'flowId'});
    flowId = linkedSignal(() => this._flowId() || this.routeData()?.flowId || '');

    _componentId = input<string>('', {alias: 'componentId'});
    componentId = linkedSignal(() => this._componentId() || this.routeData()?.componentId || '');

    inputs = input<{ [key: string]: any }>();

    //// Outputs
    componentReady = output<IMyopComponent>()
    repository = new CloudRepository();

    @ViewChild('lazyComponent', {read: ViewContainerRef}) lazyComponent?: ViewContainerRef;

    // LazyLoadedComponent?: any
    //
    // renderDynamicComponents() {
    //     alert('123')
    //
    //     this.lazyComponent?.createComponent(this.LazyLoadedComponent);
    // }
    constructor(appRef: ApplicationRef, private injector: Injector) {

        effect(async () => {
            //  console.log(this.ComponentFactoryResolver2, this.environmentInjector);
            if (this.flowId() && this.componentId()) {
                if (this.myopContainer()?.nativeElement) {

                    const flow = await this.repository.fetch(this.flowId());
                    const component = await hostSDK.loadComponent(
                        flow!.components.find(c => c.type.id === this.componentId())!,
                        this.myopContainer()?.nativeElement as any,
                        {
                            _environment: {
                                providers: createProviders(),
                                environmentInjector: this.environmentInjector,
                                appRef: appRef,
                                doIt: (LazyLoadedComponent: Type<any>) => {

                                    // Create an injector for the remote component, passing any necessary services
                                    // const componentInjector = Injector.create({
                                    //     providers: [],
                                    //     parent: this.injector, // Use the current injector as the parent for this one
                                    // });

                                  //  alert(componentInjector);

                                    // this.lazyComponent?.createComponent(LazyLoadedComponent, {
                                    //     injector: componentInjector
                                    // });

                                   // alert('111')
                                    return;
                                    //alert(this.lazyComponent?.element.nativeElement);

                                    // @ts-ignore
                                    this.lazyComponent!.element.nativeElement.innerHTML = 'DO ?';
                                    // return;


                                    //    console.log(MyopContainerComponent);
                                    //   console.log(LazyLoadedComponent);

                                    //  const x = platformBrowserDynamic().bootstrapModule(LazyLoadedComponent);
                                    // console.log(x);
                                    //   this.lazyComponent?.createComponent(MyopContainerComponent);
                                    //  this.lazyComponent?.createComponent(LazyLoadedComponent);


                                    return;


                                    // createComponent(LazyLoadedComponent, {
                                    //     hostElement: this.lazyComponent?.element.nativeElement,
                                    //     environmentInjector: this.environmentInjector
                                    // });
                                    //

                                    return;
                                    // alert('?');
                                    //
                                    // const factory = this.componentFactoryResolver.resolveComponentFactory(LazyLoadedComponent);
                                    //
                                    // alert(factory);
                                    //
                                    //
                                    // this.lazyComponent!.clear(); // Clears the view container before adding a new component
                                    // this.lazyComponent!.createComponent(factory);
                                    // //
                                    //
                                    //
                                    // debugger;

                                    //  const componentFactory = this.ComponentFactoryResolver2.resolveComponentFactory(LazyLoadedComponent)
                                    //this.lazyComponent!.clear();
                                    // this.lazyComponent!.createComponent(componentFactory, 0 , this.environmentInjector);

                                    //   alert('?');
                                    // runInInjectionContext(this.environmentInjector, () => {
                                    //     //   alert('2');
                                    //     const environmentInjector = inject(EnvironmentInjector);
                                    //     const ComponentFactoryResolver2 = inject(ComponentFactoryResolver);
                                    //
                                    //     const componentRef = createComponent(LazyLoadedComponent, {
                                    //         hostElement: this.lazyComponent!.element.nativeElement,
                                    //         environmentInjector: environmentInjector
                                    //     });
                                    //
                                    //     alert(componentRef);
                                    // });

                                    //applicationRef.attachView(componentRef.hostView);
                                    //componentRef.changeDetectorRef.detectChanges();
                                }
                            }
                        });
                    // return component;
                }
            }
        });
    }
}
