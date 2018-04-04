
import { fromJS } from 'immutable'
import autocompleteReducer from '../reducer'

describe('autocompleteReducer', () => {
  it('returns the initial state', () => {
    expect(autocompleteReducer(undefined, {})).toEqual(fromJS({}))
  })
})
