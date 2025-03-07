import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import * as i0 from "@angular/core";
export declare class HeroService {
    private http;
    private messageService;
    private heroesUrl;
    httpOptions: {
        headers: HttpHeaders;
    };
    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]>;
    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero>;
    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero>;
    searchHeroes(term: string): Observable<Hero[]>;
    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero>;
    /** DELETE: delete the hero from the server */
    deleteHero(id: number): Observable<Hero>;
    /** PUT: update the hero on the server */
    updateHero(hero: Hero): Observable<any>;
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError;
    /** Log a HeroService message with the MessageService */
    private log;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeroService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HeroService>;
}
