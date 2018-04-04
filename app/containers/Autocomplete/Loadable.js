/**
 *
 * Asynchronously loads the component for Autocomplete
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
