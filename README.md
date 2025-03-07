# Myop Angular demos

### Expose Angular components
- Use the expose function to expose Angular component to Myop admin.
- The first argument is the Angular component and second is the tag name.


### Create Myop WebComponent from your Angular component
1. Open Myop dashboard
2. Insert to Component Editor screen, Click on "+ Add a Component" button.
3. Now you in The Component Editor. Click on "+ Add" button.
4. Change the loader to "WebComponent".
5. Insert the url (http://localhost:4400).
6. Insert the tag name that you expose the component.
7. Now you can see the angular component in the admin panel.
8. The guid in the browser url is the componentId.
 
### Create Flow
1. Open Myop dashboard
2. Insert to Flows Editor screen, Click "+ Add a Flow" button.
3. Add the component.
4. The guid in the browser url is the flowId.

### Use Myop WebComponent from your Angular component
You can add Myop component in different way.

1. Routing
```typescript
   //// Befor
   { path: 'todo' , component:TodoComponent }

   //// After
    {
        path: 'todo' ,
        data : {
          componentId:"ca8c0c4f-d26e-40c8-bf32-19eb104ee710",
          flowId:"1d75e2f9-9a2d-49f1-aeeb-6268921a29fe",
        },
        component:MyopContainerComponent,
    }
```

2. As component
```typescript
    //// Befor
    <my-angular-todo-component />
        
    //// After    
    <myop-container
      [injector] ="injector"
      componentId="ca8c0c4f-d26e-40c8-bf32-19eb104ee710"
      flowId="1d75e2f9-9a2d-49f1-aeeb-6268921a29fe"
    />
```