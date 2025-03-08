import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MessagesComponent } from '@nx-20-ng-19/shared';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
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
    /* Tooltip container */
    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 220px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;

      /* Position the tooltip text - see examples below! */
      position: absolute;
      z-index: 1;
    }

    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
    .linkActive{
      background-color: yellow;
    }
  `],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="linkActive">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="linkActive">Heroes</a>
      
      <a routerLink="/myop-route" routerLinkActive="linkActive">
        <div class="tooltip">
          myop route
          <span class="tooltiptext">This is Route that use MyopContainerComponent directly with data object (componentId and flowId)</span>
        </div>
      </a>
      <a routerLink="/myop-dashboard" routerLinkActive="linkActive">myop-dashboard</a>
      <a routerLink="/myop-container-cmp" routerLinkActive="linkActive">
        myop-container-cmp
      </a>
      <a routerLink="myop-html" routerLinkActive="linkActive">myop html demo</a>
    </nav>
    <router-outlet></router-outlet>
   <!-- <app-messages />-->
  `,
})
export class AppComponent {
  title = 'Tour of Heroes';
}
