import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import * as i0 from "@angular/core";
export declare class InMemoryDataService implements InMemoryDbService {
    createDb(): {
        heroes: {
            id: number;
            name: string;
        }[];
    };
    genId(heroes: Hero[]): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<InMemoryDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InMemoryDataService>;
}
