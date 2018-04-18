import { Controller } from 'react-trim'
import view from './View'

/*
| --------------------------------------------------------
| import model from 'app/model'
| --------------------------------------------------------
| This is a combined model that is being served to this
| controller. You can define custom slices
| from your model state as described below above the
| mapStateToConnect method.
|
| Checkout the '../../app/model.js' file to see the combined
| model.
|
*/
import model from 'app/model'

class Example extends Controller {
    constructor() {
        /*
        | --------------------------------------------------------
        | Super
        | --------------------------------------------------------
        | The super method must be called before anything. It
        | takes an object with two optional properties and
        | the standard React props and context parameters
        | super({ model, view }, props, context). It simple attaches
        | the two properties to the controller with proper bindings
        | and configuration.
        | --------------------------------------------------------
        | Model:
        | The model property is a class instance of a model
        | imported in the begining of the file. It creates a model
        | property related to the controller that can be, later on,
        | accessed using `this.model`. The model, also, re-renders
        | the component when it's state is changed.
        | --------------------------------------------------------
        | View:
        | The view property is binded to the controller to access
        | all its properties and methods. It is most commonly
        | imported as a seperate file wich exports a function the
        | returns a React Element. This is mainly (but optionaly)
        | used to seperate UI from Logic.
        |
        | The view can also be an object that contains mutliple
        | views as a `{ key: view }` pair. If you are passing
        | an object, a `render` key must be defined which is used
        | as the entry point to the view within the render method
        | of the Controller. The other views can be accessed from
        | within the entry view by calling `<View.Key />`. There
        | is an example for this in the `../Users/View.jsv` file.
        |
        */
        super({ view, model })

        /*
        | --------------------------------------------------------
        | State
        | --------------------------------------------------------
        | Unlike the model, Controller states are specific and
        | only affect the Controller and its related views.
        | The model is used as a global/shared state accross
        | mutliple Controllers.
        |
        */
        this.state = {
            someState: 'I am a State!',
            someBool: false
        }
    }

    /*
    | --------------------------------------------------------
    | mapStateToConnect
    | --------------------------------------------------------
    | This method is used to define properties from the Model's
    | state that should be connected to the Controller.
    | In other words, it defines which properties in the Model's
    | state fire the Controller's render method when changed. The
    | entire state are still accessible inside `this.model.state`.
    | However a property that is not specified in this method
    | will be out of sync until a property that is connected
    | changes.
    | --------------------------------------------------------
    | By default the entire Model's state is connected if this
    | method is not defined.
    |
    */
    mapStateToConnect({ example: { someProps } }) {
        return {
            someProps
        }
    }

    componentDidMount() {
        this.model.example.asyncToggleProps()
    }

    toggleState = () => {
        this.setState({
            someState: !this.state.someBool ? 'I am a changed State!' : 'I am a State!',
            someBool: !this.state.someBool
        })
    }

    toggleProps = () => {
        this.model.example.toggleProps()
    }
}

/*
| --------------------------------------------------------
| Export
| --------------------------------------------------------
| For Controllers it is required to export the class
| definition rather than exporting the class instance
| contrary to the Model.
|
*/
export default Example
