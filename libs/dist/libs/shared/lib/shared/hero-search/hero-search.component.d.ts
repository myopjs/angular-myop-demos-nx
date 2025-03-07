import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import * as i0 from "@angular/core";
export declare class HeroSearchComponent implements OnInit {
    private heroService;
    heroes$: Observable<Hero[]>;
    private searchTerms;
    search(term: string): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeroSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeroSearchComponent, "app-hero-search", never, {}, {}, never, never, true, never>;
}
