/*
 *
 * Autocomplete reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE
} from './constants'

const initialState = fromJS({
  options: [],
  optionsLoading: false
})

function autocompleteReducer (state = initialState, action) {
  switch (action.type) {
    case GET_AUTOCOMPLETE:
      return state
        .set('optionsLoading', true)

    case SET_AUTOCOMPLETE:
      return state
        .set('optionsLoading', false)
        .set('options', fromJS(action.payload))

    default:
      return state
  }
}

export default autocompleteReducer
