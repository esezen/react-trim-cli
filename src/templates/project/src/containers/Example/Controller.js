import { Controller } from 'react-trim'
import autoBind from 'react-autobind'
import view from './View'
import model from './Model'

class Example extends Controller {
    constructor() {
        /*
        | --------------------------------------------------------
        | Super
        | --------------------------------------------------------
        | The super method must be called before anything. It
        | takes an object with three optional properties
        | ({ model, view, views }). It simple attaches the three
        | properties to the controller with proper bindings.
        | --------------------------------------------------------
        | Model:
        | The model property is an object instance of a model
        | imported in the begining of the file. It creates a model
        | property related to the controller that can be, later on,
        | accessed using `this.model`.
        | --------------------------------------------------------
        | View:
        | The view property creates a view property related to the
        | controller (`this.view`). If the model property is
        | defined the view is connected to the model to render when
        | changes have been made to the model state. It is also
        | binded to the controller to gain access to all its methods
        | and properties including the views property explained below.
        | NOTE: you do not have to define a `render()` method if the
        | view property is defiend. That is taken care of by the
        | controller.
        | --------------------------------------------------------
        | Views:
        | The views property creates a views property related to the
        | controller (`this.views`). Generally it is used in the view
        | layer and can be accessed using `Views.someView`. It is
        | useful for breaking up the view layer into smaller
        | stateful components. You can still, however, create stateless
        | components and pass controller methods and propertiesvia props.
        |
        */

        super({ view, model })
        autoBind(this)

        /*
        | --------------------------------------------------------
        | State
        | --------------------------------------------------------
        | Unlike the model, controller states are specific and
        | only affect the controller and its related components.
        | The model is used as a global state.
        |
        */
        this.state = {
            someState: 'I am a State!',
            someBool: false
        }
    }

    mapStateToConnect({ someProps }) {
        return {
            someProps
        }
    }

    componentDidMount() {
        this.model.asyncToggleProps()
    }

    toggleState() {
        this.setState({
            someState: !this.state.someBool ? 'I am a changed State!' : 'I am a State!',
            someBool: !this.state.someBool
        })
    }

    toggleProps() {
        this.model.toggleProps()
    }
}

/*
| --------------------------------------------------------
| Export
| --------------------------------------------------------
| For controllers it is required to export the class
| definition rather than exporting an object instance
| contrary to the model.
|
*/
export default Example
