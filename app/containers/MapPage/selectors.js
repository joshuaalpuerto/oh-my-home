import { createSelector } from 'reselect'

/**
 * Direct selector to the mapPage state domain
 */
const selectMapPageDomain = (state) => state.get('mapPage')

/**
 * Other specific selectors
 */

/**
 * Default selector used by MapPage
 */

const selectPlace = () => createSelector(
  selectMapPageDomain,
  (substate) => substate.get('place')
)
const selectPlaceLoading = () => createSelector(
  selectMapPageDomain,
  (substate) => substate.get('placeLoading')
)

export {
  selectMapPageDomain,
  selectPlace,
  selectPlaceLoading
}
