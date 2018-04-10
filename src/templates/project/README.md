# React Trim Application Template

The following is a template for [react-trim](https://github.com/abubakir1997/react-trim) npm package.

## React Trim CLI

To install [react-trim-cli](https://github.com/esezen/react-trim-cli) run:

```
npm i react-trim-cli -g
```

## Loaders

| Loaders | Repository |
| --- | --- |
| Controller | [js-cntrl-loader](https://github.com/abubakir1997/js-cntrl-loader) |
| Model | [js-model-loader](https://github.com/abubakir1997/js-model-loader) |
| View | [js-view-loader](https://github.com/abubakir1997/js-view-loader) |

## Documentation

The application template is fully documented and contains simple and advance example use cases. You will note the `/containers/Example` folder contain javascript without the use of any loaders. The rest of the folders utilities the loaders that are used along with `react-trim`. 

You can open the inspector in your browser and navigate to the sources path then open the file name while in development mode to see the generated file when using the loader.

### Controller

Controllers are the entry point to stateful components. The couple the Model and View layers together on entry. They are also capable of binding mutliple views to the controller which can be references form within the View layer using the `Views` object.

Controllers are, also, meant to contain component related logic and state.

### Model

The Model is an enhanced version of a redux store: it uses the redux store/reducer along with addition functionality. Essentially it manages its state within a class and then dispatches those changes to redux.

Models are meant to contain business logic and a shared state accross mutliple components (Controllers). 


### View

The View is only related to view: what the user can see. That is logic is computed outside the view and passed to the view once completed. Some essential logic lives within the view such as for loops and if statements that are used as tag attributes. 

```xml
<Tag @if={ condition } />
<Tag @for={ prop, index in object } />
```
