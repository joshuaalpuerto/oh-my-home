import { fromJS } from 'immutable'

import mapPageReducer from '../reducer'
import {
  getPlaceAction,
  setPlaceAction
} from '../actions'

describe('mapPageReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      place: {},
      placeLoading: false
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(mapPageReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should set placeLoading on getPlace', () => {
    const expectedResult = state
      .set('placeLoading', true)

    expect(mapPageReducer(state, getPlaceAction())).toEqual(expectedResult)
  })

  it('should set uses on setUser', () => {
    const payload = { place: 1 }
    const expectedResult = state
      .set('placeLoading', false)
      .set('place', fromJS(payload))

    expect(mapPageReducer(state, setPlaceAction(payload))).toEqual(expectedResult)
  })
})
