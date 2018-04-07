import {
  GET_PLACE,
  SET_PLACE
} from '../constants'

import {
  getPlaceAction,
  setPlaceAction
} from '../actions'

describe('MapPage Actions', () => {
  describe('Get Place Actions', () => {
    it('should call GET_USERS', () => {
      const payload = {}
      const expectedResult = {
        type: GET_PLACE,
        payload
      }

      expect(getPlaceAction(payload)).toEqual(expectedResult)
    })

    it('should call SET_USERS', () => {
      const payload = { place: 1 }
      const expectedResult = {
        type: SET_PLACE,
        payload
      }

      expect(setPlaceAction(payload)).toEqual(expectedResult)
    })
  })
})
