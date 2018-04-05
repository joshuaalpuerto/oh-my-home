import {
  GET_AUTOCOMPLETE,
  SET_AUTOCOMPLETE
} from '../constants'

import {
  getAutoCompleteAction,
  setAutoCompleteAction
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
