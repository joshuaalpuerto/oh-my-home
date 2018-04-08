
import { put } from 'redux-saga/effects'

import usersPageSagas, {
  fetchUsersSagas,
  fetchUsers
} from '../saga'
import {
  setUsersActions
} from '../actions'

const args = {}
const results = {
  id: 'supertestdev@gmail.com',
  email: 'supertestdev@gmail.com',
  name: {
    first: 'test',
    last: 'dev'
  }
}

describe('HomePage Saga', () => {
  describe('fetchUsersSagas', () => {
    let fetchUsersSagasMock

    beforeEach(() => {
      fetchUsersSagasMock = fetchUsersSagas()
      const callFetchLatest = fetchUsersSagasMock.next().value
      expect(callFetchLatest).toMatchSnapshot()
    })

    describe('fetchUsers', () => {
      // pass empty object for params.
      const fetchUsersMock = fetchUsers(args)

      it('should match the snapshot for setting token', () => {
        const settingToken = fetchUsersMock.next().value
        expect(settingToken).toMatchSnapshot()
      })

      it('should set setUsersAction', () => {
        // eslint-disable-next-line no-unused-vars
        const settingData = fetchUsersMock.next({ results: [results] }).value
        expect(settingData).toEqual(
          put(setUsersActions([results]))
        )
      })
    })
  })

  describe('defaultGenerators', () => {
    const usersGenerator = usersPageSagas()

    it('should have 1 functions', () => {
      const watchers = usersGenerator.next().value
      expect(watchers.length).toEqual(1)
    })
  })
})
