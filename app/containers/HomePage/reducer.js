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

    case SET_USERS:
      return state
        .set('usersLoading', false)
        .set('users', fromJS(action.payload))

    default:
      return state
  }
}

export default homeReducer
