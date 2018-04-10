import { Routes } from 'react-trim'

/*
 | --------------------------------------------------------
 | Router components
 | --------------------------------------------------------
 | List all modules to map to a route
 |
 */

import Template from 'Template/View'
import NotFound from 'NotFound/View'
import Example from 'Example/Controller'
import User from 'Users/Controller'
import Feed from 'Feed/Controller'

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


Routes.all(Template)

Routes.route('/', Example, { exact })
Routes.route('/users', User, { exact })
Routes.route('/feed', Feed)

Routes.route('*', NotFound)
