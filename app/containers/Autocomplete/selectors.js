import { createSelector } from 'reselect'

/**
 * Direct selector to the autocomplete state domain
 */
const selectAutocompleteDomain = (state) => state.get('autocomplete')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Autocomplete
 */

const selectOptions = () => createSelector(
  selectAutocompleteDomain,
  (substate) => substate.get('options')
)

const selectOptionsLoading = () => createSelector(
  selectAutocompleteDomain,
  (substate) => substate.get('optionsLoading')
)
export {
  selectAutocompleteDomain,
  selectOptions,
  selectOptionsLoading
}
