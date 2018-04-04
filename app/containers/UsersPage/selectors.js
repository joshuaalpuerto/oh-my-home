/**
 * UsersPage selectors
 */

import { createSelector } from 'reselect'

const selectUsersDomain = (state) => state.get('usersPage')

const selectUsers = () => createSelector(
  selectUsersDomain,
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
  selectUsersDomain,
  (substate) => substate.get('usersLoading')
)

export {
  selectUsersDomain,
  selectUsers,
  selectUsersActive,
  selectUsersInActive,
  selectUsersLoading
}
