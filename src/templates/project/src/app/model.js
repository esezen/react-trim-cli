import { combineModels } from 'react-trim'
import { Example } from 'Example/Model'
import { Users } from 'Users/Model'
import { Feed } from 'Feed/Model'
import { Counter } from 'Counter/Model'

/*
| --------------------------------------------------------
| import model from 'app/model'
| --------------------------------------------------------
| Creating a root model, essentially, produces a single
| source of truth where all data in the application is
| recieved from one source. You can specify different
| slices of the state within each component that fire
| a component re-render to reduce unnecessary re-renders.
|
| To create a combined Model you must pass a model class
| opposed to passing a model instance. Above the model
| class definition is being imported instead of the
| default export which happens to be an instance of each
| model in this case.
|
*/
export default combineModels({
    example: Example,
    users: Users,
    feed: Feed,
    counter: Counter,
})
