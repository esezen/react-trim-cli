import { Controller } from 'react-trim'
import autoBind from 'react-autobind'
import view from 'Views/Feed'
import model from 'Models/Feed'

class Feed extends Controller {
    constructor() {
        super({ view, model })
        autoBind(this)

        this.state = {
            post: {
                user: '',
                content: ''
            }
        }
    }

    getUsers() {
        const users = this.model.getUsers()

        return Object.keys(users).map(id => ({
            key: id,
            value: id,
            description: users[id].username,
            text: users[id].name
        }))
    }

    submitPost() {
        this.model.submitPost(this.state.post)
        this.setState({
            post: {
                user: '',
                content: ''
            }
        })
    }

    updatePostUser(e, { value }) {
        this.setState({
            post: {
                ...this.state.post,
                user: value
            }
        })
    }

    updatePostContent(e, { value }) {
        this.setState({
            post: {
                ...this.state.post,
                content: value
            }
        })
    }
}

export default Feed
