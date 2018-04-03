/*
 * UsersPage Actions
 */

import {
  GET_USERS,
  SET_USERS,
  TOGGLE_STATUS_USER
} from './constants'

export function getUsersActions (payload) {
  return {
    type: GET_USERS,
    payload
  }
}

export function setUsersActions (payload) {
  return {
    type: SET_USERS,
    payload
  }
}

export function toggleStatusUserActions (payload) {
  return {
    type: TOGGLE_STATUS_USER,
    payload
  }
}
