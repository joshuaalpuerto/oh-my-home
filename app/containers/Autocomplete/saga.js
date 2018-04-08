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
  reverse,
  slice,
  toUpper,
  uniqBy
} from 'ramda'
import { compact } from 'lodash'

import request from 'utils/request'
import { setItem, getItem } from 'utils/localStorage'

import {
  RECENT_SEARCH
} from 'containers/App/constants'
import {
  GET_AUTOCOMPLETE,
  GET_RECENT_SEARCH,
  UPDATE_RECENT_SEARCH
} from './constants'

import {
  setAutoCompleteAction,
  setRecentSearchAction
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

export function * updateRecentSearched (args) {
  const { payload } = args
  const NUMBER_VIEW_ITEMS = 2
  const searches = yield call(getItem, RECENT_SEARCH)

  const cleanSearches = compose(
    slice(0, NUMBER_VIEW_ITEMS),
    reverse,
    uniqBy(prop('place_id')),
    compact
  )

  let recentSearched = Array.isArray(searches) ? reverse(searches) : []

  recentSearched = recentSearched.concat(payload)

  yield call(setItem, RECENT_SEARCH, cleanSearches(recentSearched))
}

export function * fetchRecentSearched () {
  const searched = yield call(getItem, RECENT_SEARCH)
  yield put(setRecentSearchAction(searched || []))
}

export function * fetchAutocompleteSagas () {
  yield takeLatest(GET_AUTOCOMPLETE, fetchAutocomplete)
}
export function * fetchRecentSearchedSaga () {
  yield takeLatest(GET_RECENT_SEARCH, fetchRecentSearched)
}
export function * updateRecentSearchedSaga () {
  yield takeLatest(UPDATE_RECENT_SEARCH, updateRecentSearched)
}

// All sagas to be loaded
export function * autocompleteSagas () {
  yield [
    fork(fetchAutocompleteSagas),
    fork(fetchRecentSearchedSaga),

    fork(updateRecentSearchedSaga)
  ]
}

export default autocompleteSagas
