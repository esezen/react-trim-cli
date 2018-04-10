/**
 * import { Routes } form 'react-trim'
 * This is the globally exported Object
 */

import { RoutesManager } from 'react-trim'

const Routes = new RoutesManager()

/*
 | --------------------------------------------------------
 | Routes Manager Examples
 | --------------------------------------------------------
 | This is an adnvanced routes example
 |
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

console.log('Example Routes', Routes.export())
