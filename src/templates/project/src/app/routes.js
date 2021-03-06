import App from 'react-trim/core'

/*
 | --------------------------------------------------------
 | App Components
 | --------------------------------------------------------
 | List all modules to map to a route
 |
 */

import Template from 'Template/View'
import NotFound from 'NotFound/View'
import Example from 'Example/Controller'
import User from 'Users/Controller'
import Feed from 'Feed/Controller'
import Counter from 'Counter/Controller'

/*
 | --------------------------------------------------------
 | Routes
 | --------------------------------------------------------
 | Map route to application using react-trim. This Routes
 | object is a helper tool for creating an object that is
 | used by react-router-config.
 |
 | Note: the order matters unless you pass the exact prop
 | in a route.
 */

App.template(Template)

App.route('/', Example, {
    exact: true,
    title: 'Basic Example'
})

App.route('/counter', Counter, {
    exact: true,
    title: 'Counter'
})

App.route('/users', User, {
    exact: true,
    title: 'Users List'
})

App.route('/feed', Feed, {
    title: 'News Feed'
})

App.route('*', NotFound)
