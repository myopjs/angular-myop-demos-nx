import {Injector, Type, ApplicationConfig} from "@angular/core";
import {WebComponentSDK} from "@myop/sdk/webcomponent";
import {createCustomElement} from "@angular/elements";
import {createApplication} from "@angular/platform-browser";

const uuidv4 = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export const exposeAngularComponent = async (component: Type<any>, tagName: string, applicationConfigCreator?: () => Promise<ApplicationConfig>) => {
    if (customElements.get(tagName))
        return;

    const createElement = async () => {
        const sdk = new WebComponentSDK();

        class RuntimeAngularElement extends HTMLElement {
            //  root?: Root;

            _myopEnvironment?: {
                environmentInjector?: Injector
            };

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

            // static get observedAttributes() {
            //     return ['x', 'y'];
            // }

            // attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            //     this._props.name = newValue;
            //     this.render();
            // }

            async render() {
                debugger;

                const _id = uuidv4();
                this._shadow.innerHTML = `<myop-custom-tag-${_id}/>`;
               // @ts-ignore
                if (true || this._myopEnvironment?.environmentInjector) {




                    // this._shadow.appendChild = () => {
                    //     alert('appendChild')
                    // }
                    // this._shadow.append = () => {
                    //     alert('append')
                    // }
                    //
                    // this._shadow.insertBefore = () => {
                    //     alert('insertBefore')
                    // }

                  //  console.log('????', component);

                    // const _createElement = document.createElement;
                    //
                    // // @ts-ignore
                    // document.createElement = (...args) => {
                    //     // alert('createElement');
                    //     console.log(args)
                    //     // @ts-ignore
                    //     _createElement(...args)
                    // }


                    // this._shadow.innerHTML = `bla blu`;

                    // @ts-ignore
                    // this._myopEnvironment?.getApplication((app)=>{
                    //     const MyComponent = createCustomElement(component, {injector: app.injector});
                    //     customElements.define(`myop-custom-tag-${_id}`, MyComponent);
                    // });

                    // return;

                    //>

                    // @ts-ignore
                    //   this._myopEnvironment?.doIt(component);


                    //this._myopEnvironment?.providers

                    let applicationConfig: ApplicationConfig;
                    if (applicationConfigCreator)
                        applicationConfig = await applicationConfigCreator();

                    import('zone.js').then(() => {
                        createApplication(applicationConfig!)
                            .then((app) => {
                                const MyComponent = createCustomElement(component, {injector: app.injector});

                                const _createElement = document.createElement;

                                // temporary fix angular bad bundling :
                                //  const innerShadowRoot = this._shadow.firstChild.shadowRoot;
                                //  const linkTags = innerShadowRoot.querySelectorAll('link');

                                const scriptUrl = new URL(import.meta.url);
                                const scriptOrigin = scriptUrl.origin;


                                // @ts-ignore
                                document.createElement = (...args) => {
                                    //  console.log('what is going on ? ', args);
                                    // @ts-ignore
                                    const createdElement = _createElement.apply(document, args);
                                    if (args[0] === 'link') {
                                        let _setAttribute = createdElement.setAttribute;
                                        createdElement.setAttribute = (key, value) => {
                                            if (key === 'href') {
                                                // @ts-ignore
                                                _setAttribute.apply(createdElement, [key, `${scriptOrigin}/${value}`]);
                                            } else {
                                                // @ts-ignore
                                                _setAttribute.apply(createdElement, [key, value]);
                                            }
                                        }
                                    }

                                    return createdElement
                                }

                                customElements.define(`myop-custom-tag-${_id}`, MyComponent);

                                document.createElement = _createElement;


                                // // @ts-ignore
                                // linkTags.forEach(link => {
                                //     link.href = link.href.replace(document.location.origin, scriptOrigin);
                                // });

                                // })
                                // .catch((err) => console.error(err));
                            });
                    });
                    //console.log("??", this._myopEnvironment?.providers);
                    //
                    // createApplication({
                    //     // @ts-ignore
                    //     providers: this._myopEnvironment?.providers
                    // }).then((app) => {
                    //     const MyComponent = createCustomElement(component, {injector: app.injector});
                    //     customElements.define(`myop-custom-tag-${_id}`, MyComponent);
                    //     // })
                    //     // .catch((err) => console.error(err));
                    // });


                    // @ts-ignore
                    // const MyComponent = createCustomElement(component, {injector:  this._myopEnvironment?.appRef.injector});
                    // customElements.define(`myop-custom-tag-${_id}`, MyComponent);
                    // //
                    // alert('def def')

                    return
                    // // return;
                    // const MyComponent = createCustomElement(component, {
                    //     //  injector: this._myopEnvironment?.environmentInjector
                    //     // @ts-ignore
                    //     injector: this._myopEnvironment?.appRef.injector
                    // });
                    // customElements.define(`myop-custom-tag-${_id}`, MyComponent);

                } else {

                    let applicationConfig: ApplicationConfig; //TODO : some default ?

                    if (applicationConfigCreator)
                        applicationConfig = await applicationConfigCreator!();

                    import('zone.js').then(() => {
                        createApplication(applicationConfig)
                            .then((app) => {
                                const MyComponent = createCustomElement(component, {injector: app.injector});
                                customElements.define(`myop-custom-tag-${_id}`, MyComponent);
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

        customElements.define(tagName, RuntimeAngularElement);
        console.log(`define('${tagName}') was called, web component ready to use`);

        sdk.init();
    }

    createElement().then();
}
