import { Component } from '@angular/core';

import {MyopExposeDashboardComponent} from "./myop-expose-dashboard.component";



@Component({
  selector: 'app-myop-dashboard',
  standalone: true,
  imports: [MyopExposeDashboardComponent],
  template: `
    
    <pre style="background-color:#c0c0c0;padding:10px;">
      This demo use MyopExposeDashboardComponent, this component is derive of BaseMyopComponent. 
      This way you expose Dashboard component to Myop Admin, And can use it as normal component.
      
      &lt;myop-expose-dashboard /&gt;  
      
    </pre>
    <hr>
    <myop-expose-dashboard />     

  `,
})
export class MyopDashboardComponent{


}