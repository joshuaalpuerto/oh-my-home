
import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { setItem } from 'utils/localStorage'
import SearchFixture from 'fixtures/search.json'
import {
  RECENT_SEARCH
} from 'containers/App/constants'

import autocompleteSagas, {
  fetchAutocompleteSagas,
  fetchAutocomplete,
  fetchRecentSearchedSaga,
  fetchRecentSearched,
  updateRecentSearchedSaga,
  updateRecentSearched
} from '../saga'
import {
  setAutoCompleteAction,
  setRecentSearchAction
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

  describe('fetchRecentSearchedSaga', () => {
    let fetchRecentSearchedSagaMock

    beforeEach(() => {
      fetchRecentSearchedSagaMock = fetchRecentSearchedSaga()
      const callFetchLatest = fetchRecentSearchedSagaMock.next().value
      expect(callFetchLatest).toMatchSnapshot()
    })

    describe('fetchRecentSearched', () => {
      // pass empty object for params.
      const fetchRecentSearchedMock = cloneableGenerator(fetchRecentSearched)()

      it('should match the snapshot getting from storage', () => {
        const callingAPI = fetchRecentSearchedMock.next().value
        expect(callingAPI).toMatchSnapshot()
      })

      it('should set setRecentSearchAction with result', () => {
        // eslint-disable-next-line no-unused-vars
        const mock = fetchRecentSearchedMock.clone()
        const settingData = mock.next(results).value
        expect(settingData).toEqual(
          put(setRecentSearchAction(results))
        )
      })

      it('should set setRecentSearchAction with empty', () => {
        // eslint-disable-next-line no-unused-vars
        const mock = fetchRecentSearchedMock.clone()
        const settingData = mock.next().value
        expect(settingData).toEqual(
          put(setRecentSearchAction([]))
        )
      })
    })
  })

  describe('updateRecentSearchedSaga', () => {
    let updateRecentSearchedSagaMock

    beforeEach(() => {
      updateRecentSearchedSagaMock = updateRecentSearchedSaga()
      const callFetchLatest = updateRecentSearchedSagaMock.next().value
      expect(callFetchLatest).toMatchSnapshot()
    })

    describe('updateRecentSearched', () => {
      const payload = {
        value: 1,
        description: 'singapore'
      }
      const storage = [{
        value: 2,
        description: 'singapore, singapore'
      }]
      // pass empty object for params.
      const updateRecentSearchedMock = cloneableGenerator(updateRecentSearched)({ payload })

      it('should match the snapshot getting from storage', () => {
        const callingAPI = updateRecentSearchedMock.next().value
        expect(callingAPI).toMatchSnapshot()
      })

      it('should match the setting to storage', () => {
        const settingStorageMock = updateRecentSearchedMock.clone()

        const callingAPI = settingStorageMock.next(storage).value
        expect(callingAPI).toEqual(
          call(setItem, RECENT_SEARCH, [payload, ...storage])
        )
      })

      it('should match the only to payload', () => {
        const settingStorageMock = updateRecentSearchedMock.clone()

        const callingAPI = settingStorageMock.next(null).value
        expect(callingAPI).toEqual(
          call(setItem, RECENT_SEARCH, [payload])
        )
      })

      it('should call fetchRecentSearched()', () => {
        // eslint-disable-next-line no-unused-vars
        const settingStorage = updateRecentSearchedMock.next().value
        const callingAPI = updateRecentSearchedMock.next().value
        expect(callingAPI).toMatchSnapshot()
      })
    })
  })

  describe('defaultGenerators', () => {
    const generator = autocompleteSagas()

    it('should have 3 functions', () => {
      const watchers = generator.next().value
      expect(watchers.length).toEqual(3)
    })
  })
})
