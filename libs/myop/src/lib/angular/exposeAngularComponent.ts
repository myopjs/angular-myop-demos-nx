import {Injector, Type} from "@angular/core";
import {WebComponentSDK} from "@myop/sdk/webcomponent";
import {createCustomElement} from "@angular/elements";
import {ApplicationConfig, createApplication} from "@angular/platform-browser";

export const exposeAngularComponent = (component: Type<any>, tagName: string, injector?: Injector | null, options?: ApplicationConfig) => {
    if (customElements.get(tagName))
        return;

    const loadSDK = async () => {
        const sdk = new WebComponentSDK();

        class CustomMyopElement extends HTMLElement {
            //  root?: Root;
            _props: { name?: string, [key: string]: any } = {};
            _shadow: any;

            connectedCallback() {
                // debugger;
                //  const shadow = this.attachShadow({mode: 'closed'});
                const shadow = this.attachShadow({mode: 'open'});
                sdk.connectedCallback(this, shadow);
                this._shadow = shadow
                this.render();
            }

            static get observedAttributes() {
                return ['x', 'y'];
            }

            attributeChangedCallback(name: string, oldValue: any, newValue: any) {
                this._props.name = newValue;
                this.render();
            }

            async render() {
                const r = Math.random();
                this._shadow.innerHTML = `<myop-custom-tag-${r}/>`;
                if (injector) {
                    const MyComponent = createCustomElement(component, {injector});
                    customElements.define(`myop-custom-tag-${r}`, MyComponent);
                } else {
                    import('zone.js').then(() => {
                        createApplication(options)
                            .then((app) => {
                                const MyComponent = createCustomElement(component, {injector: app.injector});
                                customElements.define(`myop-custom-tag-${r}`, MyComponent);
                                // })
                                // .catch((err) => console.error(err));
                            });
                    });
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-empty-function
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


