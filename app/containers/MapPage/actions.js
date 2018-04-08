/*
 *
 * MapPage actions
 *
 */

import {
  GET_PLACE,
  SET_PLACE
} from './constants'

export function getPlaceAction (payload) {
  return {
    type: GET_PLACE,
    payload
  }
}

export function setPlaceAction (payload) {
  return {
    type: SET_PLACE,
    payload
  }
}
