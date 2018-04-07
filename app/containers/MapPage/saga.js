
import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'

import {
  GET_PLACE
} from './constants'
import {
  setPlaceAction
} from './actions'

import request from 'utils/request'

export function * fetchPlace (args) {
  const { payload: { placeId } } = args
  const req = yield call(request, `http://qa.omh.sg/test/places?place_id=${placeId}`, {
    method: 'GET'
  })

  yield put(setPlaceAction(req))
}

export function * fetchPlaceSagas () {
  yield takeLatest(GET_PLACE, fetchPlace)
}

// All sagas to be loaded
export function * mapPageSagas () {
  yield [
    fork(fetchPlaceSagas)
  ]
}

export default mapPageSagas
