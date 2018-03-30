import { fromJS } from 'immutable'

import {
  selectGlobal,
} from '../selectors'

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({})
    const mockedState = fromJS({
      global: globalState
    })
    expect(selectGlobal(mockedState)).toEqual(globalState)
  })
})
