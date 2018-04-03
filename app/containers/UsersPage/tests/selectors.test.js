import { fromJS } from 'immutable'

import {
  selectUsersDomain,
  selectUsers,
  selectUsersActive,
  selectUsersInActive,
  selectUsersLoading
} from '../selectors'

describe('selectUsersDomain', () => {
  it('should select the usersPage state', () => {
    const usersPageState = fromJS({
      users: [],
      usersLoading: false
    })
    const mockedState = fromJS({
      usersPage: usersPageState
    })
    expect(selectUsersDomain(mockedState)).toEqual(usersPageState)
  })
})

describe('selectUsers', () => {
  const selectors = selectUsers()
  it('should select the users', () => {
    const users = fromJS([{ user: 1 }])
    const mockedState = fromJS({
      usersPage: {
        users
      }
    })
    expect(selectors(mockedState)).toEqual(users)
  })
})

describe('selectUsersActive', () => {
  const selector = selectUsersActive()

  it('should select users Active', () => {
    const users = fromJS([])
    const mockedState = fromJS({
      usersPage: {
        users
      }
    })
    expect(selector(mockedState)).toEqual(users)
  })
})

describe('selectUsersInActive', () => {
  const selector = selectUsersInActive()

  it('should select users InActive', () => {
    const users = fromJS([ { deleted: true } ])
    const mockedState = fromJS({
      usersPage: {
        users
      }
    })
    expect(selector(mockedState)).toEqual(users)
  })
})

describe('selectUsersLoading', () => {
  const selectors = selectUsersLoading()
  it('should select the usersLoading', () => {
    const usersLoading = false
    const mockedState = fromJS({
      usersPage: {
        usersLoading
      }
    })
    expect(selectors(mockedState)).toEqual(usersLoading)
  })
})
