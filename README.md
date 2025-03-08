# Myop Angular Integration Guide

## Overview
This guide explains how to integrate your Angular components with Myop, allowing you to expose them as web components and incorporate them into Myop flows.

## Table of Contents
- [Exposing Angular Components](#exposing-angular-components)
- [Creating Myop WebComponents](#creating-myop-webcomponents)
- [Creating Flows](#creating-flows)
- [Using Myop Components in Angular](#using-myop-components-in-angular)
- [Communication with Angular Components](#communication-with-angular-components)

## Exposing Angular Components

There are two ways to expose your Angular components to Myop:

### Option 1: Direct Exposure
Use the `expose` function to directly expose your Angular component:

```typescript
// Simple approach
expose(TodoComponent, 'myop-todo');
```

### Option 2: Create a Myop Wrapper Component

Create a wrapper component that extends `BaseMyopComponent`:

```typescript
import { Component, EnvironmentInjector, inject } from "@angular/core";
import { BaseMyopComponent, MyopContainerComponent } from "@nx-20-ng-19/shared";
import { TodoComponent } from "./todo.component";

@Component({
   selector: 'myop-expose-todo',
   standalone: true,
   imports: [MyopContainerComponent],
   template: `
       <myop-container
           componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
           flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
       />
   `,
})
export class MyopExposeTodoComponent extends BaseMyopComponent {
   protected override injector = inject(EnvironmentInjector);
   override componentType = TodoComponent;
   override tagName = 'myop-todo';

   constructor() {
      super();
      this.exposeService.expose(TodoComponent, 'myop-todo', this.injector);
   }
}
```

## Creating Myop WebComponents

Follow these steps to create a Myop WebComponent from your Angular component:

1. Open the Myop dashboard at [https://dashboard.myop.dev/](https://dashboard.myop.dev/)  <br>
   <img src="docs/images/admin-dashboard.png" alt="Add Component Button" width="500"><br>

2. Navigate to the Component Editor screen and click on **"+ Add a Component"** button  <br>
   <img src="docs/images/component-editor.png" alt="Add Component Button" width="500"><br>

3. In the Component Editor, click on **"+ Add"** button

4. Configure your component:
   - Change the loader to "WebComponent"
   - Enter your component URL (e.g., http://localhost:4400)
   - Enter the tag name that you exposed the component with

5. Your Angular component should now appear in the admin panel

6. Note: The GUID in the browser URL is the `componentId` that you'll need later

## Creating Flows

1. Open the Myop dashboard at [https://dashboard.myop.dev/](https://dashboard.myop.dev/)

2. Navigate to the Flows Editor screen and click on **"+ Add a Flow"** button

3. Add your component to the flow

4. Note: The GUID in the browser URL is the `flowId` that you'll need later

## Using Myop Components in Angular

You can integrate Myop components into your Angular application in two ways:

### Option 1: Via Routing

```typescript
// Before
{ path: 'todo', component: TodoComponent }

// After - Option 1
{
    path: 'todo',
    data: {
      componentId: "ca8c0c4f-d26e-40c8-bf32-19eb104ee710",
      flowId: "1d75e2f9-9a2d-49f1-aeeb-6268921a29fe",
    },
    component: MyopContainerComponent,
}

// After - Option 2
{
    path: 'todo', 
    component: MyopExposeTodoComponent
}
```

### Option 2: As a Component in Templates

```typescript
// Before
<my-angular-todo-component />
    
// After - Option 1
<myop-container
  [injector]="injector"
  componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
  flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
/>

// After - Option 2
<myop-expose-todo />
```

## Communication with Angular Components

The `MyopContainer` component provides a `componentReady` event that you can use to communicate with your Angular component:

```typescript
<myop-container
    flowId="49283058-a787-4fa5-b0d2-516b2e6dc5e3"
    componentId="8c72d29b-c8a0-41cf-b08f-4acca96c7a16"
    (componentReady)="onReady($event)"
/>

// In your component class
onReady(component: IMyopComponent) {
    // Send messages to the component
    component.send(ChangeTextMessage.create(component.refs.title, this.inputs.name));
    
    // Show the component
    component.show();
}
```

## Additional Resources

- For more information on the Myop platform, visit [https://myop.dev/](https://myop.dev/)
- For API documentation, refer to [https://docs.myop.dev/](https://docs.myop.dev/)