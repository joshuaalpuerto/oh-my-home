/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import {
  GET_USERS
} from './constants'
import {
  setUsersActions
} from './actions'

import request from 'utils/request'

export function * fetchUsers (args) {
  // const { payload } = args
  const req = yield call(request, `https://randomuser.me/api/?results=5`, {
    method: 'GET'
  })
  const { results } = req
  const users = results.map((result) => ({
    ...result,
    id: `${result.email}`
  }))
  yield put(setUsersActions(users))
}

export function * fetchUsersSagas () {
  yield takeLatest(GET_USERS, fetchUsers)
}

// All sagas to be loaded
export function * usersPageSagas () {
  yield [
    fork(fetchUsersSagas)
  ]
}

export default usersPageSagas
