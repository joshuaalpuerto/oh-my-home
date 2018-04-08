import { fromJS } from 'immutable'

import usersPageReducer from '../reducer'
import {
  getUsersActions,
  setUsersActions,
  toggleStatusUserActions
} from '../actions'

describe('usersPageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      users: [],
      usersLoading: false
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(usersPageReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should set usersLoading on getUser', () => {
    const expectedResult = state
      .set('usersLoading', true)

    expect(usersPageReducer(state, getUsersActions())).toEqual(expectedResult)
  })

  it('should set uses on setUser', () => {
    const payload = [{ user: 1 }]
    const expectedResult = state
      .set('usersLoading', false)
      .set('users', fromJS(payload))

    expect(usersPageReducer(state, setUsersActions(payload))).toEqual(expectedResult)
  })

  it('should set user toggle', () => {
    const id = 'test'
    const payload = { id }
    const currentState = fromJS({
      users: [{ id: 'test', name: 'test' }, { id: 'test1', name: 'test1' }],
      usersLoading: false
    })

    const findIndex = currentState.get('users').findIndex(user => user.get('id') === id)

    const expectedResult = currentState.setIn(['users', findIndex, 'deleted'], true)

    expect(usersPageReducer(currentState, toggleStatusUserActions(payload))).toEqual(expectedResult)
  })
})
