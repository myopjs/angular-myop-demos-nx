import * as i0 from '@angular/core';
import { Injectable, inject, Component, viewChild, input, linkedSignal, output, afterRender, EnvironmentInjector } from '@angular/core';
import { of, Subject } from 'rxjs';
import { tap, catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import 'zone.js';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { WebComponentSDK } from '@myop/sdk/webcomponent';

class MessageService {
    messages = [];
    add(message) {
        this.messages.push(message);
    }
    clear() {
        this.messages = [];
    }
    static ɵfac = function MessageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MessageService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MessageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

function MessagesComponent_Conditional_0_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", message_r3, " ");
} }
function MessagesComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "h2");
    i0.ɵɵtext(2, "Messages");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 0);
    i0.ɵɵlistener("click", function MessagesComponent_Conditional_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.messageService.clear()); });
    i0.ɵɵtext(4, "Clear messages");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(5, MessagesComponent_Conditional_0_For_6_Template, 2, 1, "div", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.messageService.messages);
} }
class MessagesComponent {
    messageService = inject(MessageService);
    static ɵfac = function MessagesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MessagesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MessagesComponent, selectors: [["app-messages"]], decls: 1, vars: 1, consts: [["type", "button", 1, "clear", 3, "click"]], template: function MessagesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, MessagesComponent_Conditional_0_Template, 7, 0, "div");
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.messageService.messages.length ? 0 : -1);
        } }, styles: ["h2[_ngcontent-%COMP%]{color:#a80000;font-family:Arial,Helvetica,sans-serif;font-weight:lighter}.clear[_ngcontent-%COMP%]{color:#333;background-color:#eee;margin-bottom:12px;padding:1rem;border-radius:4px;font-size:1rem}.clear[_ngcontent-%COMP%]:hover{color:#fff;background-color:#42545c}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MessagesComponent, [{
        type: Component,
        args: [{ selector: 'app-messages', template: "@if (messageService.messages.length) {\n  <div>\n    <h2>Messages</h2>\n    <button type=\"button\" class=\"clear\" (click)=\"messageService.clear()\">Clear messages</button>\n    @for (message of messageService.messages; track message) {\n      <div> {{message}} </div>\n    }\n  </div>\n}\n", styles: ["h2{color:#a80000;font-family:Arial,Helvetica,sans-serif;font-weight:lighter}.clear{color:#333;background-color:#eee;margin-bottom:12px;padding:1rem;border-radius:4px;font-size:1rem}.clear:hover{color:#fff;background-color:#42545c}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MessagesComponent, { className: "MessagesComponent", filePath: "lib/shared/messages/messages.component.ts", lineNumber: 9 }); })();

class HeroService {
    http = inject(HttpClient);
    messageService = inject(MessageService);
    heroesUrl = 'api/heroes'; // URL to web api
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    /** GET heroes from the server */
    getHeroes() {
        return this.http.get(this.heroesUrl)
            .pipe(tap(_ => this.log('fetched heroes')), catchError(this.handleError('getHeroes', [])));
    }
    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404(id) {
        const url = `${this.heroesUrl}/?id=${id}`;
        return this.http.get(url)
            .pipe(map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
            const outcome = h ? 'fetched' : 'did not find';
            this.log(`${outcome} hero id=${id}`);
        }), catchError(this.handleError(`getHero id=${id}`)));
    }
    /** GET hero by id. Will 404 if id not found */
    getHero(id) {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError(`getHero id=${id}`)));
    }
    /* GET heroes whose name contains search term */
    searchHeroes(term) {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get(`${this.heroesUrl}/?name=${term}`).pipe(tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)), catchError(this.handleError('searchHeroes', [])));
    }
    //////// Save methods //////////
    /** POST: add a new hero to the server */
    addHero(hero) {
        return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(tap((newHero) => this.log(`added hero w/ id=${newHero.id}`)), catchError(this.handleError('addHero')));
    }
    /** DELETE: delete the hero from the server */
    deleteHero(id) {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, this.httpOptions).pipe(tap(_ => this.log(`deleted hero id=${id}`)), catchError(this.handleError('deleteHero')));
    }
    /** PUT: update the hero on the server */
    updateHero(hero) {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(tap(_ => this.log(`updated hero id=${hero.id}`)), catchError(this.handleError('updateHero')));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
    /** Log a HeroService message with the MessageService */
    log(message) {
        this.messageService.add(`HeroService: ${message}`);
    }
    static ɵfac = function HeroService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeroService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: HeroService, factory: HeroService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeroService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

function HeroSearchComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 5);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const hero_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵpropertyInterpolate1("routerLink", "/detail/", hero_r3.id, "");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", hero_r3.name, " ");
} }
class HeroSearchComponent {
    heroService = inject(HeroService);
    heroes$;
    searchTerms = new Subject();
    // Push a search term into the observable stream.
    search(term) {
        this.searchTerms.next(term);
    }
    ngOnInit() {
        this.heroes$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), 
        // switch to new search observable each time the term changes
        switchMap((term) => this.heroService.searchHeroes(term)));
    }
    static ɵfac = function HeroSearchComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeroSearchComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeroSearchComponent, selectors: [["app-hero-search"]], decls: 9, vars: 2, consts: [["searchBox", ""], ["id", "search-component"], ["for", "search-box"], ["id", "search-box", 3, "input"], [1, "search-result"], [3, "routerLink"]], template: function HeroSearchComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1)(1, "label", 2);
            i0.ɵɵtext(2, "Hero Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "input", 3, 0);
            i0.ɵɵlistener("input", function HeroSearchComponent_Template_input_input_3_listener() { i0.ɵɵrestoreView(_r1); const searchBox_r2 = i0.ɵɵreference(4); return i0.ɵɵresetView(ctx.search(searchBox_r2.value)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "ul", 4);
            i0.ɵɵrepeaterCreate(6, HeroSearchComponent_For_7_Template, 3, 3, "li", null, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵpipe(8, "async");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵrepeater(i0.ɵɵpipeBind1(8, 0, ctx.heroes$));
        } }, dependencies: [AsyncPipe, RouterLink], styles: ["label[_ngcontent-%COMP%]{display:block;font-weight:700;font-size:1.2rem;margin-top:1rem;margin-bottom:.5rem}input[_ngcontent-%COMP%]{padding:.5rem;width:100%;max-width:600px;box-sizing:border-box;display:block}input[_ngcontent-%COMP%]:focus{outline:#336699 auto 1px}li[_ngcontent-%COMP%]{list-style-type:none}.search-result[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;display:inline-block;width:100%;max-width:600px;padding:.5rem;box-sizing:border-box;text-decoration:none;color:#000}.search-result[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:#435a60;color:#fff}ul.search-result[_ngcontent-%COMP%]{margin-top:0;padding-left:0}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeroSearchComponent, [{
        type: Component,
        args: [{ selector: 'app-hero-search', imports: [AsyncPipe, RouterLink], template: "<div id=\"search-component\">\n  <label for=\"search-box\">Hero Search</label>\n  <input #searchBox id=\"search-box\" (input)=\"search(searchBox.value)\" />\n\n  <ul class=\"search-result\">\n    @for (hero of heroes$ | async; track hero) {\n      <li >\n        <a routerLink=\"/detail/{{hero.id}}\">\n          {{hero.name}}\n        </a>\n      </li>\n    }\n  </ul>\n</div>\n", styles: ["label{display:block;font-weight:700;font-size:1.2rem;margin-top:1rem;margin-bottom:.5rem}input{padding:.5rem;width:100%;max-width:600px;box-sizing:border-box;display:block}input:focus{outline:#336699 auto 1px}li{list-style-type:none}.search-result li a{border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;display:inline-block;width:100%;max-width:600px;padding:.5rem;box-sizing:border-box;text-decoration:none;color:#000}.search-result li a:hover{background-color:#435a60;color:#fff}ul.search-result{margin-top:0;padding-left:0}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HeroSearchComponent, { className: "HeroSearchComponent", filePath: "lib/shared/hero-search/hero-search.component.ts", lineNumber: 20 }); })();

class InMemoryDataService {
    createDb() {
        const heroes = [
            { id: 12, name: 'Dr. Nice' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr. IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' }
        ];
        return { heroes };
    }
    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(heroes) {
        return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    }
    static ɵfac = function InMemoryDataService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InMemoryDataService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InMemoryDataService, factory: InMemoryDataService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InMemoryDataService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

const HEROES = [
    { id: 12, name: 'Dr. Nice' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr. IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

const _c0 = ["myopContainer"];
const _c1 = ["*", [["", "error", ""]]];
const _c2 = ["*", "[error]"];
function MyopContainerComponent_ProjectionFallback_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Loading... ");
} }
class MyopContainerComponent {
    route = inject(ActivatedRoute);
    routeData = toSignal(this.route.data);
    //// View children
    myopContainer = viewChild('myopContainer');
    //// INPUTS
    injector = input();
    _flowId = input('', { alias: 'flowId' });
    flowId = linkedSignal(() => this._flowId() || this.routeData()?.flowId || '');
    _componentId = input('', { alias: 'componentId' });
    componentId = linkedSignal(() => this._componentId() || this.routeData()?.componentId || '');
    inputs = input();
    //// Outputs
    componentReady = output();
    static loading;
    static isLoaded = false;
    static userFlows = {};
    static hostSDK;
    constructor() {
        if (typeof window !== 'undefined') {
            let firstRender = true;
            afterRender(() => {
                if (firstRender) {
                    this.load();
                    firstRender = false;
                }
            });
        }
    }
    static async ready() {
        if (MyopContainerComponent.isLoaded) {
            return;
        }
        if (MyopContainerComponent.loading) {
            await MyopContainerComponent.loading;
            MyopContainerComponent.loading = undefined;
            return;
        }
        // eslint-disable-next-line no-async-promise-executor
        MyopContainerComponent.loading = new Promise(async (resolve, reject) => {
            const { hostSDK } = await import('@myop/sdk/host');
            MyopContainerComponent.hostSDK = hostSDK;
            MyopContainerComponent.isLoaded = true;
            resolve();
        });
        return MyopContainerComponent.loading;
    }
    async load() {
        await MyopContainerComponent.ready();
        if (!MyopContainerComponent.userFlows[this.flowId()]) {
            // eslint-disable-next-line no-async-promise-executor
            MyopContainerComponent.userFlows[this.flowId()] = new Promise(async (resolve, reject) => {
                const res = await fetch(`https://cloud.myop.dev/flow?id=${this.flowId()}&resolve=components`);
                const json = await res.json();
                resolve(json.item);
            });
        }
        const flow = await MyopContainerComponent.userFlows[this.flowId()];
        const component = await MyopContainerComponent.hostSDK.loadComponent(flow.components.find(c => c.type.id === this.componentId()), this.myopContainer()?.nativeElement, { hidden: false });
        this.componentReady.emit(component);
    }
    static ɵfac = function MyopContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyopContainerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyopContainerComponent, selectors: [["myop-container"]], viewQuery: function MyopContainerComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.myopContainer, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, inputs: { injector: [1, "injector"], _flowId: [1, "flowId", "_flowId"], _componentId: [1, "componentId", "_componentId"], inputs: [1, "inputs"] }, outputs: { componentReady: "componentReady" }, ngContentSelectors: _c2, decls: 5, vars: 0, consts: [["myopContainer", ""]], template: function MyopContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "div", null, 0);
            i0.ɵɵprojection(2, 0, null, MyopContainerComponent_ProjectionFallback_2_Template, 1, 0);
            i0.ɵɵprojection(4, 1);
            i0.ɵɵelementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyopContainerComponent, [{
        type: Component,
        args: [{
                // eslint-disable-next-line @angular-eslint/component-selector
                selector: 'myop-container',
                standalone: true,
                template: `
  <div #myopContainer>
    <ng-content>
      <!--  Not Loaded-->
      Loading...
    </ng-content>
    <ng-content select="[error]">     
    </ng-content>
  </div>
  `
            }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyopContainerComponent, { className: "MyopContainerComponent", filePath: "lib/shared/myop-container.component.ts", lineNumber: 23 }); })();

class MyopExposeService {
    injector = inject(EnvironmentInjector);
    expose(component, tagName) {
        if (customElements.get(tagName))
            return;
        const loadSDK = async () => {
            const sdk = new WebComponentSDK();
            class CustomMyopElement extends HTMLElement {
                //  root?: Root;
                _props = {};
                _shadow;
                connectedCallback() {
                    // debugger;
                    //  const shadow = this.attachShadow({mode: 'closed'});
                    const shadow = this.attachShadow({ mode: 'open' });
                    sdk.connectedCallback(this, shadow);
                    this._shadow = shadow;
                    this.render();
                }
                static get observedAttributes() {
                    return ['x', 'y'];
                }
                attributeChangedCallback(name, oldValue, newValue) {
                    // @ts-ignore
                    this._props[name] = newValue;
                    this.render();
                }
                async render() {
                    const r = Math.random();
                    this._shadow.innerHTML = `<myop-custom-tag-${r}/>`;
                    createApplication()
                        .then((app) => {
                        const MyComponent = createCustomElement(component, { injector: app.injector });
                        customElements.define(`myop-custom-tag-${r}`, MyComponent);
                    })
                        .catch((err) => console.error(err));
                }
                disconnectedCallback() {
                }
            }
            //const tagName = 'angular-component';
            customElements.define(tagName, CustomMyopElement);
            console.log(`define('${tagName}') was called, web component ready to use`);
            sdk.init();
        };
        loadSDK().then();
    }
    static ɵfac = function MyopExposeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyopExposeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MyopExposeService, factory: MyopExposeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyopExposeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
// export function provideMyopExpose(component: Type<any>, tagName: string) {
//   return makeEnvironmentProviders([
//     { provide:'', useClass:expose}
//   ])
// }
const expose = (component, tagName, appConfig) => {
    if (customElements.get(tagName))
        return;
    const loadSDK = async () => {
        const sdk = new WebComponentSDK();
        class CustomMyopElement extends HTMLElement {
            //  root?: Root;
            _props = {};
            _shadow;
            connectedCallback() {
                // debugger;
                //  const shadow = this.attachShadow({mode: 'closed'});
                const shadow = this.attachShadow({ mode: 'open' });
                sdk.connectedCallback(this, shadow);
                this._shadow = shadow;
                this.render();
            }
            static get observedAttributes() {
                return ['x', 'y'];
            }
            attributeChangedCallback(name, oldValue, newValue) {
                // @ts-ignore
                this._props[name] = newValue;
                this.render();
            }
            async render() {
                const r = Math.random();
                this._shadow.innerHTML = `<myop-custom-tag-${r}/>`;
                createApplication(appConfig)
                    .then((app) => {
                    const MyComponent = createCustomElement(component, { injector: app.injector });
                    customElements.define(`myop-custom-tag-${r}`, MyComponent);
                })
                    .catch((err) => console.error(err));
            }
            disconnectedCallback() {
            }
        }
        //const tagName = 'angular-component';
        customElements.define(tagName, CustomMyopElement);
        console.log(`define('${tagName}') was called, web component ready to use`);
        sdk.init();
    };
    loadSDK().then();
};

/**
 * Generated bundle index. Do not edit.
 */

export { HEROES, HeroSearchComponent, HeroService, InMemoryDataService, MessageService, MessagesComponent, MyopContainerComponent, MyopExposeService, expose };
//# sourceMappingURL=nx-20-ng-19-shared.mjs.map
