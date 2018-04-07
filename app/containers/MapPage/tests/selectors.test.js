import { fromJS } from 'immutable'

import {
  selectMapPageDomain,
  selectPlace,
  selectPlaceLoading
} from '../selectors'

describe('selectMapPageDomain', () => {
  it('should select the mapPage state', () => {
    const mapPageState = fromJS({
      place: [],
      placeLoading: false
    })
    const mockedState = fromJS({
      mapPage: mapPageState
    })
    expect(selectMapPageDomain(mockedState)).toEqual(mapPageState)
  })
})

describe('selectPlace', () => {
  const selectors = selectPlace()
  it('should select the place', () => {
    const place = fromJS({ place: 1 })
    const mockedState = fromJS({
      mapPage: {
        place
      }
    })
    expect(selectors(mockedState)).toEqual(place)
  })
})

describe('selectPlaceLoading', () => {
  const selectors = selectPlaceLoading()
  it('should select the placeLoading', () => {
    const placeLoading = false
    const mockedState = fromJS({
      mapPage: {
        placeLoading
      }
    })
    expect(selectors(mockedState)).toEqual(placeLoading)
  })
})
