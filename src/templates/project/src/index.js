import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from 'scripts/registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-trim'

import './routes'
import './routes.doc'

/*
 | --------------------------------------------------------
 | View
 | --------------------------------------------------------
 | Application view entry point
 |
 */

ReactDOM.render((
	<BrowserRouter>
		{ Routes.render() }
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
