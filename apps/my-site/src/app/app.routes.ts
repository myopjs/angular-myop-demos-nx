import { Routes } from '@angular/router';
import { MyopContainerComponent } from '@nx-20-ng-19/shared';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //// Myop routes
  {
    path: 'myop-dashboard2' ,
    providers:[],
    data : {
      componentId:"ca8c0c4f-d26e-40c8-bf32-19eb104ee710",
      flowId:"1d75e2f9-9a2d-49f1-aeeb-6268921a29fe",
    },
    component:MyopContainerComponent,
  },
  {
    path: 'myop-dashboard' ,
    loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.MyopDashboardComponent)
  },

  { path: 'dashboard' , loadComponent: ()=> import('@nx-20-ng-19/dashboard').then( m=>m.DashboardComponent) },
  { path: 'detail/:id', loadComponent: ()=> import('./hero-detail/hero-detail.component').then( m=>m.HeroDetailComponent) },
  { path: 'heroes'    , loadComponent: ()=> import('./heroes/heroes.component').then(m=>m.HeroesComponent) }
];