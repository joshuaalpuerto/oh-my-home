import { fromJS } from 'immutable'

import {
  selectHomeDomain,
  selectUsers,
  selectUsersActive,
  selectUsersInActive,
  selectUsersLoading
} from '../selectors'

describe('selectHomeDomain', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      users: [],
      usersLoading: false
    })
    const mockedState = fromJS({
      home: homeState
    })
    expect(selectHomeDomain(mockedState)).toEqual(homeState)
  })
})

describe('selectUsers', () => {
  const selectors = selectUsers()
  it('should select the users', () => {
    const users = fromJS([{ user: 1 }])
    const mockedState = fromJS({
      home: {
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
      home: {
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
      home: {
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
      home: {
        usersLoading
      }
    })
    expect(selectors(mockedState)).toEqual(usersLoading)
  })
})
