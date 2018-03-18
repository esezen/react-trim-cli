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
 | Map route to application using react-router
 |
 */

export default {
component: Template,
routes: [
	{
		path: '/',
		component: Example,
		exact,
	},
	{
		path: '/users',
		component: UsersList,
		exact,
	},
	{
		path: '/feed',
		component: Feed,
	},
	{
		path: '*',
		component: NotFound,
	},
]}
