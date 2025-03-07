import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from '@nx-20-ng-19/shared';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    MessagesComponent,
    MessagesComponent
  ],
  styles: [`
    /* AppComponent's private CSS styles */
    h1 {
      margin-bottom: 0;
    }
    nav a {
      padding: 1rem;
      text-decoration: none;
      margin-top: 10px;
      display: inline-block;
      background-color: #e8e8e8;
      color: #3d3d3d;
      border-radius: 4px;
    }
    nav a:hover {
      color: white;
      background-color: #42545C;
    }
    nav a.active {
      background-color: black;
    }
  `],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/myop-dashboard">myop-dashboard</a>
      <a routerLink="/myop-dashboard2">myop-dashboard2</a>
      <a routerLink="/heroes">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    <app-messages />
  `,
})
export class AppComponent {
  title = 'Tour of Heroes';
}
