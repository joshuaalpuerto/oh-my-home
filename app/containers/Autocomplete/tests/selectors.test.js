import { fromJS } from 'immutable'

import {
  selectAutocompleteDomain,
  selectOptions,
  selectOptionsLoading,
  selectRecentSearches
} from '../selectors'

describe('selectAutocompleteDomain', () => {
  it('should select the autocomplete state', () => {
    const autocompleteState = fromJS({
      options: [],
      optionsLoading: false
    })
    const mockedState = fromJS({
      autocomplete: autocompleteState
    })
    expect(selectAutocompleteDomain(mockedState)).toEqual(autocompleteState)
  })
})

describe('selectOptions', () => {
  const selectors = selectOptions()
  it('should select the options', () => {
    const options = fromJS([{ option: 1 }])
    const mockedState = fromJS({
      autocomplete: {
        options
      }
    })
    expect(selectors(mockedState)).toEqual(options)
  })
})

describe('optionsLoading', () => {
  const selectors = selectOptionsLoading()
  it('should select the optionsLoading', () => {
    const optionsLoading = false
    const mockedState = fromJS({
      autocomplete: {
        optionsLoading
      }
    })
    expect(selectors(mockedState)).toEqual(optionsLoading)
  })
})

describe('RecentSearches', () => {
  const selectors = selectRecentSearches()
  it('should select the recentSearches', () => {
    const recentSearches = fromJS([{ search: 1 }])
    const mockedState = fromJS({
      autocomplete: {
        recentSearches
      }
    })
    expect(selectors(mockedState)).toEqual(recentSearches)
  })
})
