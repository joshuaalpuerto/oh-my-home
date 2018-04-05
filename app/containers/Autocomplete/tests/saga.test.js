
import { put } from 'redux-saga/effects'
import SearchFixture from 'fixtures/search.json'

import autocompleteSagas, {
  fetchAutocompleteSagas,
  fetchAutocomplete
} from '../saga'
import {
  setAutoCompleteAction
} from '../actions'

const args = {}
const results = SearchFixture

describe('Autocomplete Saga', () => {
  describe('fetchAutocompleteSagas', () => {
    let fetchAutocompleteSagasMock

    beforeEach(() => {
      fetchAutocompleteSagasMock = fetchAutocompleteSagas()
      const callFetchLatest = fetchAutocompleteSagasMock.next().value
      expect(callFetchLatest).toMatchSnapshot()
    })

    describe('fetchAutocomplete', () => {
      // pass empty object for params.
      const fetchAutocompleteMock = fetchAutocomplete(args)

      it('should match the snapshot for setting token', () => {
        const callingAPI = fetchAutocompleteMock.next().value
        expect(callingAPI).toMatchSnapshot()
      })

      it('should set setAutoCompleteAction', () => {
        // eslint-disable-next-line no-unused-vars
        const settingData = fetchAutocompleteMock.next(results).value
        expect(settingData).toEqual(
          put(setAutoCompleteAction(results.predictions))
        )
      })
    })
  })

  describe('defaultGenerators', () => {
    const generator = autocompleteSagas()

    it('should have 1 functions', () => {
      const watchers = generator.next().value
      expect(watchers.length).toEqual(1)
    })
  })
})
