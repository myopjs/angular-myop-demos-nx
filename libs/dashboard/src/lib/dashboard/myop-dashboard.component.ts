import { Component, EnvironmentInjector, inject } from '@angular/core';
import { MyopContainerComponent } from '@nx-20-ng-19/shared';
import { IMyopComponent } from '@myop/sdk/host';
import { ChangeTextMessage } from '@myop/sdk/messages';

@Component({
  selector:'ccc',
  template:'',
})
export class BaseMyopContainer{
  protected injector = inject(EnvironmentInjector);
}


@Component({
  selector: 'app-myop-dashboard',
  standalone: true,
  imports: [MyopContainerComponent],
  template: `
    <!--<myop-container
      flowId      = "49283058-a787-4fa5-b0d2-516b2e6dc5e3"
      componentId = "8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
      (componentReady)="onReady($event)"
    />-->
     
    <myop-container
      [injector] ="injector"
      componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
      flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
    />
  `,
})
export class MyopDashboardComponent extends BaseMyopContainer{

  protected inputs = {
    name: 'Myop name',
    age : '23',
    date: Date.now()
  }
  onReady(component:IMyopComponent){
    component.send(ChangeTextMessage.create(component.refs.title, this.inputs.name));
    component.show();
  }
}