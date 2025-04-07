import { Routes } from '@angular/router';
import { MyopContainerComponent } from '@myop/angular';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard' , loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.DashboardComponent) },
  { path: 'detail/:id', loadComponent: ()=> import('./hero-detail/hero-detail.component').then( m=>m.HeroDetailComponent) },
  { path: 'heroes'    , loadComponent: ()=> import('./heroes/heroes.component').then(m=>m.HeroesComponent) },

  //////////////////
  //// Myop Demos
  //////////////////

  //// Myop Demo - html
  {
    path: 'myop-html' ,
    loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.MyopHtmlDemoComponent)
  },
  //// Myop Demo - Use Myop container component to display Dashboard component.
  {
    path: 'myop-container-cmp' ,
    loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.MyopContainerCmpDemoComponent)
  },
  //// Myop Demo - Use Myop container component directly with data object.
  {
    path: 'myop-route' ,
    providers:[],
    data : {
      componentId:"ca8c0c4f-d26e-40c8-bf32-19eb104ee710",
      flowId:"1d75e2f9-9a2d-49f1-aeeb-6268921a29fe",
    },
    component:MyopContainerComponent,
  },
  //// Myop Demo - Use Myop wrapper component to display Dashboard component.
  {
    path: 'myop-dashboard' ,
    loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.MyopDashboardComponent)
  },

];
