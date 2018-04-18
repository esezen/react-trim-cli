import App from 'react-trim/core'
import registerServiceWorker from 'scripts/registerServiceWorker'

import 'app/routes'

/*
 | --------------------------------------------------------
 | Mount
 | --------------------------------------------------------
 | Mount Application to the DOM
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
