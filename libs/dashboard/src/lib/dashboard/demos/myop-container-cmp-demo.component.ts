import {MyopContainerComponent} from "@nx-20-ng-19/myop";
import {Component} from "@angular/core";

@Component({
    selector: 'app-myop-dashboard',
    standalone: true,
    imports: [MyopContainerComponent],
    template: `
        <pre style="background-color:#c0c0c0;padding:10px;">
            This demo use myop-container component to display Angular Dashboard component.
            
            &lt;myop-container
                    componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
                    flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
            /&gt;
        </pre>
        <hr>
        <myop-container
                componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
                flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
        />
    `,
})
export class MyopContainerCmpDemoComponent {

}