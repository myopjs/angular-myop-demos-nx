import { Component, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Hero, HeroService } from '@nx-20-ng-19/shared';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  imports: [RouterLink],
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
