/*
 * HomeReducer
 */
import { fromJS } from 'immutable'

import {
  GET_USERS,
  SET_USERS
} from './constants'

// The initial state of the App
const initialState = fromJS({
  users: [],
  usersLoading: false
})

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state
        .set('usersLoading', true)

    case SET_USERS: {
      // needs to concat items
      const concatState = state.get('users').concat(fromJS(action.payload))

      return state
        .set('usersLoading', false)
        .set('users', concatState)
    }
    default:
      return state
  }
}

export default homeReducer
