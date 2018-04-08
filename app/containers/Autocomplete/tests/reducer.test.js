import { fromJS } from 'immutable'

import autocompleteReducer from '../reducer'
import {
  getAutoCompleteAction,
  setAutoCompleteAction,
  setRecentSearchAction
} from '../actions'

describe('autocompleteReducer', () => {
  let state
  beforeEach(() => {
    state = fromJS({
      options: [],
      optionsLoading: false,

      recentSearches: []
    })
  })

  it('should return the initial state', () => {
    const expectedResult = state
    expect(autocompleteReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should set optionsLoading on getAutoComplete', () => {
    const expectedResult = state
      .set('optionsLoading', true)

    expect(autocompleteReducer(state, getAutoCompleteAction())).toEqual(expectedResult)
  })

  it('should set options on setAutoComplete', () => {
    const payload = [{ user: 1 }]
    const expectedResult = state
      .set('optionsLoading', false)
      .set('options', fromJS(payload))

    expect(autocompleteReducer(state, setAutoCompleteAction(payload))).toEqual(expectedResult)
  })

  it('should set recentSearches on setRecentSearchAction', () => {
    const payload = [{ user: 1 }]
    const expectedResult = state
      .set('recentSearches', fromJS(payload))

    expect(autocompleteReducer(state, setRecentSearchAction(payload))).toEqual(expectedResult)
  })
})
