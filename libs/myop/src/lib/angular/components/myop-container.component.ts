import {Component, effect, ElementRef, inject, input, linkedSignal, output, viewChild} from '@angular/core';
import {IMyopComponent} from '@myop/sdk/host';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {MyopAngularService} from "../services/myop-angular.service";


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
