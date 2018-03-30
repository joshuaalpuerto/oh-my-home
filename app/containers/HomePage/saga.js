/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import {
  setErrorOperationAction
} from 'containers/App/actions'

import {
  GET_USERS
} from './constants'
import {
  setUsersActions
} from './actions'

import request from 'utils/request'

export function * fetchUsers (args) {
  // const { payload } = args
  try {
    const req = yield call(request, `/`, {
      method: 'GET'
    })

    yield put(setUsersActions(req))
  } catch (e) {
    yield put(setErrorOperationAction(e.message))
  }
}

export function * fetchUsersSagas () {
  yield takeLatest(GET_USERS, fetchUsers)
}

// All sagas to be loaded
export function * homePageSagas () {
  yield [
    fork(fetchUsersSagas)
  ]
}

export default homePageSagas
