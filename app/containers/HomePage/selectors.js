/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectHomeDomain = (state) => state.get('home')

const selectUsers = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('users')
)

const selectUsersActive = () => createSelector(
  selectUsers(),
  (substate) => substate.filter((user) => !user.get('deleted'))
)

const selectUsersInActive = () => createSelector(
  selectUsers(),
  (substate) => substate.filter((user) => !!user.get('deleted'))
)

const selectUsersLoading = () => createSelector(
  selectHomeDomain,
  (substate) => substate.get('usersLoading')
)

export {
  selectHomeDomain,
  selectUsers,
  selectUsersActive,
  selectUsersInActive,
  selectUsersLoading
}
