/*
 *
 * MapPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_PLACE,
  SET_PLACE
} from './constants'

const initialState = fromJS({
  place: {},
  placeLoading: false
})

function mapPageReducer (state = initialState, action) {
  switch (action.type) {
    case GET_PLACE:
      return state
        .set('placeLoading', true)

    case SET_PLACE:
      return state
        .set('placeLoading', false)
        .set('place', fromJS(action.payload))

    default:
      return state
  }
}

export default mapPageReducer
