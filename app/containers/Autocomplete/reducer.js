/*
 *
 * Autocomplete reducer
 *
 */

import { fromJS } from 'immutable'
import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE,

  SET_RECENT_SEARCH
} from './constants'

const initialState = fromJS({
  options: [],
  optionsLoading: false,

  recentSearches: []
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

    case SET_RECENT_SEARCH:
      return state
        .set('recentSearches', fromJS(action.payload))

    default:
      return state
  }
}

export default autocompleteReducer
