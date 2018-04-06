import { Controller } from 'react-trim'
import autoBind from 'react-autobind'
import view from 'Views/UsersList'
import model from 'Models/Users'

class UsersList extends Controller {
    constructor() {
        super({ view, model })
        autoBind(this)
    }

    componentDidMount() {
        this.model.asyncAppendUser({
            name: 'Async User',
            username: '@async'
        })
    }

    addUser() {
        this.model.addUser()
        this.model.updateNewUser({
            name: '',
            username: ''
        })
    }

    delUser(id) {
        this.model.delUser(id)
    }

    updateUsername({ target }) {
        this.model.updateNewUser({
            username: `@${target.value}`
        })
    }

    updateName({ target }) {
        this.model.updateNewUser({
            name: target.value
        })
    }
}

export default UsersList
