/*
 * AppReducer
 */

import { fromJS } from 'immutable'

// The initial state of the App
const initialState = fromJS({})

function appReducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default appReducer
