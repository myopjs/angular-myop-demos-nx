import {Injectable} from "@angular/core";
import {IUserFlow} from "@myop/sdk/common";
import {HostSDK} from "@myop/sdk/dist/module/host/hostSDK";

/*
* Load Myop Angular component from Myop Admin.
* */
@Injectable({providedIn: 'root'})
export class MyopComponentLoaderService {
    loading?: Promise<void>;
    isLoaded = false;
    userFlows: Record<string, Promise<IUserFlow>> = {};
    hostSDK?: HostSDK;

    async ready() {
        if (this.isLoaded) {
            return;
        }

        if (this.loading) {
            await this.loading;
            this.loading = undefined;
            return;
        }

        // eslint-disable-next-line no-async-promise-executor
        this.loading = new Promise(async (resolve, reject) => {
            const {hostSDK} = await import('@myop/sdk/host');
            this.hostSDK = hostSDK;
            this.isLoaded = true;
            resolve();
        });

        return this.loading;
    }

    async load(flowId: string, componentId: string, nativeElementContainer: HTMLElement) {
        await this.ready();

        if (!this.userFlows[flowId]) {
            // eslint-disable-next-line no-async-promise-executor
            this.userFlows[flowId] = new Promise(async (resolve, reject) => {
                const res = await fetch(`https://cloud.myop.dev/flow?id=${flowId}&resolve=components`);
                const json = await res.json();
                resolve(json.item);
            });
        }

        const flow = await this.userFlows[flowId];
        const component = await this.hostSDK!.loadComponent(
            flow!.components.find(c => c.type.id === componentId)!, nativeElementContainer, {hidden: false}
        );
        return component;
    }
}