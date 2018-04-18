/*
| --------------------------------------------------------
| LOADER FILE
| --------------------------------------------------------
| The following file is using react-trim's model loader to
| automate some code like setting Commands using the @command
| Decorator.
|
*/

export class Users {
    constructor() {
        /*
        | --------------------------------------------------------
        | onChange
        | --------------------------------------------------------
        | This binds an onChange listener so when `this.state.users`
        | changes the `this.updateId` method is executed.
        |
        */
        this.onChange('users', this.updateId)
    }

    initState() {
        return {
            id: 4,
            execute: true,
            update: true,
            status: 'Add',
            newuser: { name: '', username: '' },
            users: {
                1: { name: 'Abdelrahman Salem', username: '@abubakir1997' },
                2: { name: 'Enes Sezen', username: '@esezen' },
                3: { name: 'Omar Salem', username: '@omar94' }
            }
        }
    }

    updateId(prevState) {
        if (this.state.status !== 'Update') {
            this.setState({
                id: { $set: this.getNewId() }
            })
        }
    }

    /*
    | --------------------------------------------------------
    | Helpers
    | --------------------------------------------------------
    */

    getNewId() {
        const ids = Object.keys(this.state.users)
        const lastId = Number(ids[ids.length - 1])

        return lastId ? lastId + 1 : 1
    }

    getUser(id, type = null) {
        var user = this.state.users[id]

        if (user === undefined) {
            user = { name: 'DNE', username: '@dne' }
        }

        return type === null ? user : user[type]
    }

    getWithExtraProp() {
        return Object.keys(this.state.users).map(key => ({
            ...this.state.users[key],
            id: key,
            school: 'Drexel'
        }))
    }

    /*
    | --------------------------------------------------------
    | Async Actions
    | --------------------------------------------------------
    */

    asyncAppendUser(user) {
        if (this.state.execute) {
            setTimeout(() => {
                this.removeExecute()
                this.appendUser(user)
            }, 1000)
        }
    }

    /*
    | --------------------------------------------------------
    | Commands
    | --------------------------------------------------------
    | Create a custom command to use in your setState object
    | --------------------------------------------------------
    | @command
    | This decorator automates the setCommand('iff', this.iff)
    | in the constructor.
    */

    @command
    iff(array, original) {
        return array[0] ? array[1] : original
    }

    /*
    | --------------------------------------------------------
    | Actions
    | --------------------------------------------------------
    */

    removeExecute() {
        this.setState({
            execute: { $set: false }
        })
    }

    appendUser(user) {
        const newId = this.getNewId()

        this.setState({
            id: {
                $iff: [
                    this.state.status !== 'Update',
                    newId + 1
                ]
            },
            users: {
                [newId]: { $set: user }
            }
        })
    }

    updateUser(id) {
        this.setState({
            id: { $set: Number(id) },
            status: { $set: 'Update' },
            newuser: { $set: this.state.users[id] }
        })
    }

    delUser(id) {
        this.setState({
            users: { $unset: [ id ] }
        })
    }

    addUser() {
        const name = this.state.newuser.name.trim()
        const username = this.state.newuser.username.trim()

        this.setState({
            id: { $set: this.getNewId() },
            status: { $set: 'Add' },
            users: {
                [this.state.id]: {
                    $set: {
                        name: name.length > 0 ? name : 'Empty',
                        username: username.length > 1 ? username : '@empty'
                    }
                }
            }
        })
    }

    updateNewUser(payload) {
        this.setState({
            newuser: {
                $merge: payload
            }
        })
    }
}
