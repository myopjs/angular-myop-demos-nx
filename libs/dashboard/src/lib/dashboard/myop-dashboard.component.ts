import { Component, EnvironmentInjector, inject } from '@angular/core';
import { MyopContainerComponent } from '@nx-20-ng-19/shared';
import { IMyopComponent } from '@myop/sdk/host';
import { ChangeTextMessage } from '@myop/sdk/messages';
import {MyopExposeDashboardComponent} from "./myop-expose-dashboard.component";



@Component({
  selector: 'app-myop-dashboard',
  standalone: true,
  imports: [MyopContainerComponent, MyopExposeDashboardComponent],
  template: `
    
    <h3>Myop Dashboard2 (myop-expose-dashboard)</h3>
    <myop-expose-dashboard />
    <hr/>

    <h3>Myop Dashboard</h3>
    <myop-container
        componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
        flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
    />
    <hr/>
    
    <h3>Myop HTML</h3>
    <myop-container
      flowId      = "49283058-a787-4fa5-b0d2-516b2e6dc5e3"
      componentId = "8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
      (componentReady)="onReady($event)"
    />
     

  `,
})
export class MyopDashboardComponent{

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