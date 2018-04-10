import { Routes } from 'react-trim'

/**
 * Checkout Advanced Example
 * --------------------------------------------------------
 * This only outputs the object
 * and does not define actual routes
 * --------------------------------------------------------
 * Project Routes are defined below
 */
import './routes.example'

/*
 | --------------------------------------------------------
 | Router components
 | --------------------------------------------------------
 | List all modules to map to a route
 |
 */

import Template from 'Views/Template'
import NotFound from 'Views/NotFound'
import Example from 'Controllers/Example'
import UsersList from 'Controllers/UsersList'
import Feed from 'Controllers/Feed'

/*
 | --------------------------------------------------------
 | Router Configuration
 | --------------------------------------------------------
 | Configure routers using the defined constants
 |
 */

const exact = true

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

/**
 * The following method defines template
 * component that will be rendered in all routes.
 *
 * @param {function} React Component
 */
Routes.all(Template)

/**
 * The following method routes a path to a component.
 *
 * @param {path}        String
 * @param {function}    React Component
 * @param {object}      Extra Props
 */

Routes.route('/', Example, { exact })
Routes.route('/users', UsersList, { exact })
Routes.route('/feed', Feed)

/**
 * When all routes fail
 * this will render.
 *
 * Define this last.
 */
Routes.route('*', NotFound)

/**
 * This exports the routes to
 * be used by react-router-config
 */
export default Routes.export()
