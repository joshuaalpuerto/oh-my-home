/**
 * The global state selectors
 */

const selectGlobal = (state) => state.get('global')

const selectRoute = (state) => state.get('route')

export {
  selectGlobal,
  selectRoute
}
