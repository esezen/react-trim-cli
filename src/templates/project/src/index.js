import React from 'react'
import ReactDOM from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from 'scripts/registerServiceWorker'
import unMountLoader from 'scripts/unMountLoader'
import Routes from './routes'

/*
 | --------------------------------------------------------
 | View
 | --------------------------------------------------------
 | Application view entry point
 |
 */

ReactDOM.render((
	<BrowserRouter>
		{ renderRoutes([ Routes ]) }
	</BrowserRouter>
), document.getElementById('root'))

/*
 | --------------------------------------------------------
 | Services
 | --------------------------------------------------------
 | Call services after render
 |
 */

registerServiceWorker()
unMountLoader()
