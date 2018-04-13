import App from 'react-trim/core'
import registerServiceWorker from 'scripts/registerServiceWorker'

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


App.template(Template)

App.route('/', Example, { exact })
App.route('/users', User, { exact })
App.route('/feed', Feed)

App.route('*', NotFound)


/*
 | --------------------------------------------------------
 | View
 | --------------------------------------------------------
 | Application view entry point
 |
 */

App.mount('root')

/*
 | --------------------------------------------------------
 | Services
 | --------------------------------------------------------
 | Call services after render
 |
 */

registerServiceWorker()
