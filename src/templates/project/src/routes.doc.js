/**
 * import { Routes } form 'react-trim'
 * This is the globally exported Object
 * ---------------------------------------------
 * To create a new instance import { RoutesManager }
 * ---------------------------------------------
 * It is preferred to use { Routes } since it
 * maintains its routes wihtout needing to
 * export routes across files.
 *
 * It also makes good use of the Routes.render()
 * method for rendering routes.
 */

import { RoutesManager } from 'react-trim'

const Routes = new RoutesManager()

/**
 * The following method defines template
 * component that will be rendered in all routes.
 *
 * @param {function} React Component
 */
Routes.all(null)

/**
 * The following method routes a path to a component.
 *
 * @param {path}        String
 * @param {function}    React Component
 * @param {object}      Extra Props
 */
Routes.route('/some-route', null, {})


/**
 * The following method creates a group of routes.
 * It passes a route instance to the second parameter
 * to create children routes. By default it renders
 * all routes. You can provide a component in the third
 * parameter as a wrapper and call the Routes.render(props.route)
 * method inside the component.
 *
 * @param {path}        String
 * @param {function}    CallBack
 * @param {object}      Component (optional)
 */
Routes.group('/parent', Parent => {

    Parent.route('/child1')
    Parent.route('/child2')

    Parent.route('/child3')
         .route('/child3.1')
         .route('/child3.1.2')

    Parent.route('/child4')

    Parent.group('/child-parent', Child => {
        Child.route('/grand-child1')
        Child.route('/grand-child2')
             .route('/grand-child2.1')
    })
})

/**
 * When all routes fail
 * this will render.
 *
 * Define this last.
 */
Routes.route('*', null)

/**
 * The export methods returns the routes as an object
 * that follows the react-router-config object strucuture.
 *
 * Open your console to see the generated object.
 */
console.log('Example Routes', Routes.export())
