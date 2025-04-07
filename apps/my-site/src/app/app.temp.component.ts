import {Component, CUSTOM_ELEMENTS_SCHEMA, SchemaMetadata, Type} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MyopContainerComponent} from "@myop/angular"

@Component({
    standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
        MyopContainerComponent
    ],
    selector: 'app-root-temp',
    // schemas : [
    //   //  CUSTOM_ELEMENTS_SCHEMA
    // ],
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

        .linkActive {
            background-color: yellow;
        }
    `],
    template: `
        <h1>{{ title }}</h1>

        <div>my web site testser</div>

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

            <myop-container
                    flowId="49283058-a787-4fa5-b0d2-516b2e6dc5e3"
                    componentId="8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
            />

            <router-outlet></router-outlet>

            <!--<myop-container/>-->
        </nav>
        <!-- <app-messages />-->
    `,
})
export class AppComponentTemp {
    title = 'Tour of Heroes';
}
