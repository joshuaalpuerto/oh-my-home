/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga'
import {
  call,
  put,
  fork } from 'redux-saga/effects'
import {
  compose,
  equals,
  ifElse,
  prop,
  toUpper
} from 'ramda'

import request from 'utils/request'

import {
  GET_AUTOCOMPLETE
} from './constants'

import {
  setAutoCompleteAction
} from './actions'

export function * fetchAutocomplete (args) {
  const { payload } = args

  const req = yield call(request, `http://qa.omh.sg/test/autocomplete?input=${encodeURIComponent(payload)}`, {
    method: 'GET'
  })

  const status = prop('status')
  const results = prop('predictions')

  const dispatch = ifElse(
    compose(equals('OK'), toUpper, status),
    compose(put, setAutoCompleteAction, results),
    () => {}
  )

  yield dispatch(req)
}

export function * fetchAutocompleteSagas () {
  yield takeLatest(GET_AUTOCOMPLETE, fetchAutocomplete)
}

// All sagas to be loaded
export function * autocompleteSagas () {
  yield [
    fork(fetchAutocompleteSagas)
  ]
}

export default autocompleteSagas
