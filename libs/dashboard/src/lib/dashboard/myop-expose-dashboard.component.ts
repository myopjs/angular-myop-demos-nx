import {Component, EnvironmentInjector, inject} from "@angular/core";
import {BaseMyopComponent, MyopContainerComponent} from "@nx-20-ng-19/shared";
import {DashboardComponent} from "./dashboard.component";


@Component({
    selector: 'myop-expose-dashboard',
    standalone: true,
    imports: [MyopContainerComponent],
    template: `
        <myop-container
                componentId = "ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
                flowId      = "1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
        />
    `,

})
export class MyopExposeDashboardComponent extends BaseMyopComponent {
    protected override injector = inject(EnvironmentInjector);
    override componentType = DashboardComponent;
    override tagName = 'myop-dashboard';

    constructor() {
        super();
        this.exposeService.expose(DashboardComponent,'myop-dashboard',this.injector);
    }

}
