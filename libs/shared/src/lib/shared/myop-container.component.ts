import { afterRender, Component, ElementRef, inject, input, linkedSignal, output, viewChild } from '@angular/core';
import { IUserFlow } from '@myop/sdk/common';
import { HostSDK } from '@myop/sdk/dist/module/host/hostSDK';
import { IMyopComponent } from '@myop/sdk/host';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'myop-container',
  standalone: true,
  template: `
  <div #myopContainer>
    <ng-content>
      <!--  Not Loaded-->
      Loading...
    </ng-content>
    <ng-content select="[error]">     
    </ng-content>
  </div>
  `
})
export class MyopContainerComponent {
  protected route = inject(ActivatedRoute);
  routeData = toSignal<{flowId:string,componentId:string}>(this.route.data as any);


  //// View children
  myopContainer = viewChild<ElementRef<HTMLDivElement>>('myopContainer');

  //// INPUTS
  injector = input<any>();

  _flowId = input<string>('',{alias:'flowId'});
  flowId = linkedSignal(()=> this._flowId() || this.routeData()?.flowId || '');

  _componentId = input<string>('',{alias:'componentId'});
  componentId = linkedSignal(()=> this._componentId() || this.routeData()?.componentId || '');

  inputs = input<{[key:string]:any}>();

  //// Outputs
  componentReady = output<IMyopComponent>()

  static loading?: Promise<void>;
  static isLoaded = false;
  static userFlows: Record<string, Promise<IUserFlow>> = {};
  static hostSDK?: HostSDK;

  constructor() {
    if (typeof window !== 'undefined') {
      let firstRender = true;

      afterRender(() => {
        if (firstRender) {
          this.load();
          firstRender = false;
        }
      });
    }
  }


  static async ready () {
    if (MyopContainerComponent.isLoaded) {
      return;
    }

    if (MyopContainerComponent.loading) {
      await MyopContainerComponent.loading;
      MyopContainerComponent.loading = undefined;
      return;
    }

    // eslint-disable-next-line no-async-promise-executor
    MyopContainerComponent.loading = new Promise(async (resolve, reject) => {
      const { hostSDK } = await import('@myop/sdk/host');
      MyopContainerComponent.hostSDK = hostSDK;
      MyopContainerComponent.isLoaded = true;
      resolve();
    });

    return MyopContainerComponent.loading;
  }

  async load() {
    await MyopContainerComponent.ready();

    if (!MyopContainerComponent.userFlows[this.flowId()]) {
      // eslint-disable-next-line no-async-promise-executor
      MyopContainerComponent.userFlows[this.flowId()] = new Promise(async (resolve, reject) => {
        const res = await fetch(`https://cloud.myop.dev/flow?id=${this.flowId()}&resolve=components`);
        const json = await res.json();

        resolve(json.item);
      });
    }

    const flow = await MyopContainerComponent.userFlows[this.flowId()];
    const component = await MyopContainerComponent.hostSDK!.loadComponent(
      flow!.components.find(c => c.type.id === this.componentId())!, this.myopContainer()?.nativeElement,{hidden:false}
    );
    this.componentReady.emit(component);
  }
}
