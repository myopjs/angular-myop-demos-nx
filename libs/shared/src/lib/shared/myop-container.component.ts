import {
  afterRender,
  Component, effect,
  ElementRef,
  inject,
  Injectable,
  input,
  linkedSignal,
  output,
  viewChild
} from '@angular/core';
import { IUserFlow } from '@myop/sdk/common';
import { HostSDK } from '@myop/sdk/dist/module/host/hostSDK';
import { IMyopComponent } from '@myop/sdk/host';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({providedIn:'root'})
export class MyopAngularService {
  loading?: Promise<void>;
  isLoaded = false;
  userFlows: Record<string, Promise<IUserFlow>> = {};
  hostSDK?: HostSDK;

  async ready () {
    if (this.isLoaded) {
      return;
    }

    if (this.loading) {
      await this.loading;
      this.loading = undefined;
      return;
    }

    // eslint-disable-next-line no-async-promise-executor
    this.loading = new Promise(async (resolve, reject) => {
      const { hostSDK } = await import('@myop/sdk/host');
      this.hostSDK = hostSDK;
      this.isLoaded = true;
      resolve();
    });

    return this.loading;
  }
  async load(flowId:string,componentId:string,nativeElementContainer:HTMLElement) {
    await this.ready();

    if (!this.userFlows[flowId]) {
      // eslint-disable-next-line no-async-promise-executor
      this.userFlows[flowId] = new Promise(async (resolve, reject) => {
        const res = await fetch(`https://cloud.myop.dev/flow?id=${flowId}&resolve=components`);
        const json = await res.json();
        resolve(json.item);
      });
    }

    const flow = await this.userFlows[flowId];
    const component = await this.hostSDK!.loadComponent(
        flow!.components.find(c => c.type.id === componentId)!,nativeElementContainer,{hidden:false}
    );
    return component;
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
      Loading...
    </ng-content>
    <ng-content select="[error]">     
    </ng-content>
  </div>
  `
})
export class MyopContainerComponent {
  protected route = inject(ActivatedRoute);
  protected myopAngularService = inject(MyopAngularService);
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

  constructor() {
    effect( async () => {
      if(this.myopContainer()?.nativeElement && this.flowId() && this.componentId()) {
        // @ts-ignore
        await this.myopAngularService.load(this.flowId(), this.componentId(), this.myopContainer().nativeElement);
      }
    });
  }
}
