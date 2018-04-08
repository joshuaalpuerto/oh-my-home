/**
 *
 * Asynchronously loads the component for MapPage
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
