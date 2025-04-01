import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero,HeroSearchComponent,HeroService} from '@nx-20-ng-19/shared';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  //encapsulation: ViewEncapsulation.ShadowDom,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [HeroSearchComponent, RouterLink, HeroSearchComponent],
  styles : [`

      h2 {
          text-align: center;
      }

      * {
          background: green;
      }

  `],
  template:`
    
    <style id="hadar123">
      * {
        background: green;
      }
    </style>
    
      <div class="hero-header" style="background-image: url('assets/hero-image.jpg');">
          <h1 style="background: red">Welcome to Hero Central</h1>
      </div>
    
      <style>   h2 {
          text-align: center;
      }

      * {
          background: green;
      }</style>

      <!-- Description Section -->
      <p class="hero-description">
          Discover the bravest and most popular heroes in our universe. Click on a name to learn more about their
          extraordinary stories.
      </p>

      <h2>Top Heroes</h2>
      <div class="heroes-menu">
          @for (hero of heroes; track hero) {
              <a routerLink="/detail/{{hero.id}}">{{ hero.name }}</a>
          }
      </div>

      <app-hero-search/>
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
export class DashboardComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
