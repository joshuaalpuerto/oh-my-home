/*
 * HomeReducer
 */
import { fromJS } from 'immutable'

import {
  GET_USERS,
  SET_USERS,
  TOGGLE_STATUS_USER
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

    case TOGGLE_STATUS_USER: {
      const { id } = action.payload
      // needs to concat items
      const users = state.get('users')
      const findIndex = users.findIndex(user => user.get('id') === id)
      const user = users.get(findIndex)
      const updatedState = users.setIn([findIndex, 'deleted'], !user.get('deleted'))

      return state
        .set('users', updatedState)
    }
    default:
      return state
  }
}

export default homeReducer
