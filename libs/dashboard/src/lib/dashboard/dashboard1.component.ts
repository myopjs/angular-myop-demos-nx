import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
//import {RouterLink} from '@angular/router';
//import {Hero, HeroSearchComponent, HeroService} from '@nx-20-ng-19/shared';

@Component({
    selector: 'component-1',
    standalone: true,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [],
    template: `
        <!-- Hero Image Section -->
        <div class="hero-header" style="color:red">
            <h1>Welcome to Hero Central</h1>
        </div>

        <div>
            hey hey hey
        </div>
        
        <style>
            /* DashboardComponent's private CSS styles */
            
            h2 {
                text-align: center;
            }

            .heroes-menu {
                padding: 0;
                margin: auto;
                max-width: 1000px;

                /* flexbox */
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
                align-content: flex-start;
                align-items: flex-start;
            }

            a {
                background-color: #3f525c;
                border-radius: 2px;
                padding: 1rem;
                font-size: 1.2rem;
                text-decoration: none;
                display: inline-block;
                color: #fff;
                text-align: center;
                width: 100%;
                min-width: 70px;
                margin: .5rem auto;
                box-sizing: border-box;

                /* flexbox */
                order: 0;
                flex: 0 1 auto;
                align-self: auto;
            }

            @media (min-width: 600px) {
                a {
                    width: 18%;
                    box-sizing: content-box;
                }
            }

            a:hover {
                background-color: black;
            }
        </style>

    `
})
export class Dashboard1Component implements OnInit {
    // private heroService = inject(HeroService);
    //
    // heroes: Hero[] = [];
    //
    ngOnInit(): void {
      //  alert('?')
    }

    //
    // getHeroes(): void {
    //   this.heroService
    //     .getHeroes()
    //     .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
    // }
}
