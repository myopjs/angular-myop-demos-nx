import {MyopContainerComponent} from "@nx-20-ng-19/myop";
import {Component} from "@angular/core";
import {IMyopComponent} from "@myop/sdk/host";
import {ChangeTextMessage} from "@myop/sdk/messages";

@Component({
    selector: 'app-myop-dashboard',
    standalone: true,
    imports: [MyopContainerComponent],
    template: `
        <pre style="background-color:#c0c0c0;padding:10px;">
            This demo use MyopContainerComponent to display HTML from Myop Admin.
            
            &lt;myop-container
                    flowId      = "49283058-a787-4fa5-b0d2-516b2e6dc5e3"
                    componentId = "8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
                    (componentReady)="onReady($event)"
            /&gt;
        </pre>
        <hr>
        <myop-container
                flowId      = "49283058-a787-4fa5-b0d2-516b2e6dc5e3"
                componentId = "8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
                (componentReady)="onReady($event)"
        />
    `,
})
export class MyopHtmlDemoComponent {
    protected inputs = {
        name: 'Myop name',
        age : '23',
        date: Date.now()
    }
    onReady(component:IMyopComponent){
        component.send(ChangeTextMessage.create(component.refs.title, this.inputs.name));
        component.show();
    }
}