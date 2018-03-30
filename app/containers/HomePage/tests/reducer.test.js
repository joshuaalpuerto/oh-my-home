import { fromJS } from 'immutable'

import homeReducer from '../reducer'
import {
  getUsersActions,
  setUsersActions
  // toggleStatusUserActions
} from '../actions'

describe('homeReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      users: [],
      usersLoading: false
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(homeReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should set usersLoading on getUser', () => {
    const expectedResult = state
      .set('usersLoading', true)

    expect(homeReducer(state, getUsersActions())).toEqual(expectedResult)
  })

  it('should set uses on setUser', () => {
    const payload = [{ user: 1 }]
    const expectedResult = state
      .set('usersLoading', false)
      .set('users', fromJS(payload))

    expect(homeReducer(state, setUsersActions(payload))).toEqual(expectedResult)
  })
})
