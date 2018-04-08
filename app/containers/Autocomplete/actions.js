/*
 *
 * Autocomplete actions
 *
 */

import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE,

  GET_RECENT_SEARCH,
  SET_RECENT_SEARCH,
  UPDATE_RECENT_SEARCH
} from './constants'

export function getAutoCompleteAction (payload) {
  return {
    type: GET_AUTOCOMPLETE,
    payload
  }
}

export function setAutoCompleteAction (payload) {
  return {
    type: SET_AUTOCOMPLETE,
    payload
  }
}

export function getRecentSearchAction (payload) {
  return {
    type: GET_RECENT_SEARCH,
    payload
  }
}

export function setRecentSearchAction (payload) {
  return {
    type: SET_RECENT_SEARCH,
    payload
  }
}

export function updateRecentSearchAction (payload) {
  return {
    type: UPDATE_RECENT_SEARCH,
    payload
  }
}
