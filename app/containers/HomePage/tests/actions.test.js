import {
  GET_USERS,
  SET_USERS,
  TOGGLE_STATUS_USER
} from '../constants'

import {
  getUsersActions,
  setUsersActions,
  toggleStatusUserActions
} from '../actions'

describe('HomePage Actions', () => {
  describe('Users Actions', () => {
    it('should call GET_USERS', () => {
      const payload = {}
      const expectedResult = {
        type: GET_USERS,
        payload
      }

      expect(getUsersActions(payload)).toEqual(expectedResult)
    })

    it('should call SET_USERS', () => {
      const payload = [{ user: 1 }, { user: 2 }]
      const expectedResult = {
        type: SET_USERS,
        payload
      }

      expect(setUsersActions(payload)).toEqual(expectedResult)
    })

    it('should call SET_USERS', () => {
      const payload = '123'
      const expectedResult = {
        type: TOGGLE_STATUS_USER,
        payload
      }

      expect(toggleStatusUserActions(payload)).toEqual(expectedResult)
    })
  })
})
