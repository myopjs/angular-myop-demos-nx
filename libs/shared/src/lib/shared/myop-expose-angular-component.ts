import { EnvironmentInjector, inject, Injectable, makeEnvironmentProviders, Type } from '@angular/core';
import 'zone.js';
import { ApplicationConfig, createApplication } from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';
import { WebComponentSDK } from '@myop/sdk/webcomponent'

@Injectable({providedIn: 'root'})
export class MyopExposeService {
  protected injector = inject(EnvironmentInjector);

  expose (component: Type<any>, tagName: string) {

    if (customElements.get(tagName))
      return;

    const loadSDK = async () => {
      const sdk = new WebComponentSDK();

      class CustomMyopElement extends HTMLElement {
        //  root?: Root;
        _props: any = {};
        _shadow: any;

        connectedCallback() {
          // debugger;
          //  const shadow = this.attachShadow({mode: 'closed'});
          const shadow = this.attachShadow({ mode: 'open' });
          sdk.connectedCallback(this, shadow);
          this._shadow = shadow
          this.render();
        }

        static get observedAttributes() {
          return ['x', 'y'];
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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
    }

    loadSDK().then();
  }
}

// export function provideMyopExpose(component: Type<any>, tagName: string) {
//   return makeEnvironmentProviders([
//     { provide:'', useClass:expose}
//   ])
// }

export const expose = (component: Type<any>, tagName: string,appConfig?:ApplicationConfig) => {

    if (customElements.get(tagName))
      return;

    const loadSDK = async () => {
      const sdk = new WebComponentSDK();

      class CustomMyopElement extends HTMLElement {
        //  root?: Root;
        _props: any = {};
        _shadow: any;

        connectedCallback() {
          // debugger;
          //  const shadow = this.attachShadow({mode: 'closed'});
          const shadow = this.attachShadow({ mode: 'open' });
          sdk.connectedCallback(this, shadow);
          this._shadow = shadow
          this.render();
        }

        static get observedAttributes() {
          return ['x', 'y'];
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
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
    }

    loadSDK().then();
  }
