/*
 *
 * Autocomplete actions
 *
 */

import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE
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
