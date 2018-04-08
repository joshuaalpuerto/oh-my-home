import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE,

  GET_RECENT_SEARCH,
  SET_RECENT_SEARCH,
  UPDATE_RECENT_SEARCH
} from '../constants'

import {
  getAutoCompleteAction,
  setAutoCompleteAction,
  getRecentSearchAction,
  setRecentSearchAction,
  updateRecentSearchAction
} from '../actions'

describe('Autocomplete Actions', () => {
  it('should call GET_AUTOCOMPLETE', () => {
    const payload = {}
    const expectedResult = {
      type: GET_AUTOCOMPLETE,
      payload
    }

    expect(getAutoCompleteAction(payload)).toEqual(expectedResult)
  })

  it('should call SET_AUTOCOMPLETE', () => {
    const payload = [{ result: 1 }, { result: 2 }]
    const expectedResult = {
      type: SET_AUTOCOMPLETE,
      payload
    }

    expect(setAutoCompleteAction(payload)).toEqual(expectedResult)
  })
})

describe('RecentSearch Actions', () => {
  it('should call GET_RECENT_SEARCH', () => {
    const payload = {}
    const expectedResult = {
      type: GET_RECENT_SEARCH,
      payload
    }

    expect(getRecentSearchAction(payload)).toEqual(expectedResult)
  })

  it('should call SET_RECENT_SEARCH', () => {
    const payload = [{ result: 1 }, { result: 2 }]
    const expectedResult = {
      type: SET_RECENT_SEARCH,
      payload
    }

    expect(setRecentSearchAction(payload)).toEqual(expectedResult)
  })

  it('should call UPDATE_RECENT_SEARCH', () => {
    const payload = { result: 3 }
    const expectedResult = {
      type: UPDATE_RECENT_SEARCH,
      payload
    }

    expect(updateRecentSearchAction(payload)).toEqual(expectedResult)
  })
})
