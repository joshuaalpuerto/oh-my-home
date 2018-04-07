
import { put } from 'redux-saga/effects'

import mapPageSagas, {
  fetchPlaceSagas,
  fetchPlace
} from '../saga'
import {
  setPlaceAction
} from '../actions'

const args = {
  payload: { placeId: 1 }
}
const results = {
  place: 1
}

describe('MapPage Saga', () => {
  describe('fetchPlaceSagas', () => {
    let fetchPlaceSagasMock

    beforeEach(() => {
      fetchPlaceSagasMock = fetchPlaceSagas()
      const callFetchLatest = fetchPlaceSagasMock.next().value
      expect(callFetchLatest).toMatchSnapshot()
    })

    describe('fetchPlace', () => {
      // pass empty object for params.
      const fetchPlaceMock = fetchPlace(args)

      it('should match the snapshot for setting token', () => {
        const callingAPI = fetchPlaceMock.next().value
        expect(callingAPI).toMatchSnapshot()
      })

      it('should set setPlaceAction', () => {
        // eslint-disable-next-line no-unused-vars
        const settingData = fetchPlaceMock.next(results).value
        expect(settingData).toEqual(
          put(setPlaceAction(results))
        )
      })
    })
  })

  describe('defaultGenerators', () => {
    const generator = mapPageSagas()

    it('should have 1 functions', () => {
      const watchers = generator.next().value
      expect(watchers.length).toEqual(1)
    })
  })
})
