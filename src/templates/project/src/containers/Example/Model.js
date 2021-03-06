import { Model } from 'react-trim'

export class Example extends Model {
    constructor() {
        /*
        | --------------------------------------------------------
        | Super
        | --------------------------------------------------------
        | The super method must be called prior to any code.
        | It essentially creates the redux store.
        | --------------------------------------------------------
        | There is one optional parameter which is the Models.
        | The Models paramter is an object containing mutliple
        | Model class instances. It is used to bind a model or models
        | to one model as dependencies. Binded models can be accessed
        | within the model itself and any controller/view that uses
        | the model. There is an example in the `../Feed/Model.jsm`
        | file.
        | --------------------------------------------------------
        | Example: super({ users: UsersInstance })
        | Results: this.users === UsersInstance
        |
        */
        super()

        /*
        | --------------------------------------------------------
        | Commands
        | --------------------------------------------------------
        | Commands are custom functions that can be used in the
        | setState method to maintain an immutable state within
        | the model along with predefined commands.
        | --------------------------------------------------------
        | Checkout https://github.com/kolodny/immutability-helper
        | for information on predefined commands.
        | --------------------------------------------------------
        | Commands can be invoked within the object using the
        | dollar sign followed by the custom function name.
        | --------------------------------------------------------
        | Example below can be accessed using { $my_toggle: ... }
        | as illustrated below.
        |
        */
        this.setCommand('$my_toggle', this.my_toggle)
    }

    /*
    | --------------------------------------------------------
    | Inital State
    | --------------------------------------------------------
    | This method sets the inital state if not defined it
    | will default to an empty object `{}`
    |
    */
    initState() {
        return {
            execute: true,
            someProps: 'I am a Props!',
            someBool: false
        }
    }

    /*
    | --------------------------------------------------------
    | Helpers
    | --------------------------------------------------------
    | Below is an example of a helper function that could
    | potentially be shared by other methods.
    |
    */

    getInital() {
        return 'I am a Props!';
    }

    /*
    | --------------------------------------------------------
    | Async Actions
    | --------------------------------------------------------
    | Since the state is updated using the setState method
    | a function could be used asynchronously. A common example
    | would be to used setState within an ajax call after
    | receiving a response from a server.
    |
    */

    asyncToggleProps() {
        if (this.state.execute) {
            setTimeout(() => {
                /**
                 * You may set the state directly
                 */
                this.setState({
                    execute: { $set: false }
                })

                /**
                 * Or you may call another method that
                 * sets the state.
                 */
                this.toggleProps()
            }, 1000)
        }
    }

    /*
    | --------------------------------------------------------
    | Commands
    | --------------------------------------------------------
    | Commands are used in actions to mutate the state
    | via immutability-helper. Essentially, it is equivalent
    | to extending the update method functionality as described
    | in immutability-helper's git repository.
    | --------------------------------------------------------
    | original: immutability-helper passes the property from
    | the state object where the mutation will be made.
    |
    | argument: is argument to the command by the user. Since
    | an argument is not needed for this example I passed null
    | as the argument.
    */

    my_toggle(argument, original) {
        return !argument ? 'I am a changed Props!' : this.getInital()
    }

    /*
    | --------------------------------------------------------
    | Actions
    | --------------------------------------------------------
    | The following method below is an example of an action
    | method that changes the state. This essentially is
    | equivalent to a action/case in a redux reducer.
    |
    */

    toggleProps() {
        this.setState({
            someBool: { $set: !this.state.someBool },
            someProps: { $my_toggle: this.state.someBool }
        })
    }
}

/*
| --------------------------------------------------------
| Export Object Instance
| --------------------------------------------------------
| It is recommended to export an instance of the Model
| class for the following reasons.
|
| 1. To use in the controller: the controller requires an
|    instance of a model.
| 2. To maintain changes made to the state accross the
|    application: creating an instance within the
|    will create a new object every time the
|    controller/view re-renders. This will bring the state
|    back to it's initial state everytime since
|    manipulation where done in another object.
*/

export default new Example()
