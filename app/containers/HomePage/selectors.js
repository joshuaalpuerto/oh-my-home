/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHomeDomain = (state) => state.get('home')

const selectUsers = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('users')
)
const selectUsersLoading = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('usersLoading')
)

export {
  selectUsers,
  selectUsersLoading
}
