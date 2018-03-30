/**
 * Test the HomePage
 */

import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import TableData from 'components/TableData'
import Button from 'components/Button'
import { HomePage, mapDispatchToProps } from '../index'
import {
  getUsersActions,
  toggleStatusUserActions
} from '../actions'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <HomePage {...props}>
    {children}
  </HomePage>
)

describe('<HomePage />', () => {
  const minProps = {
    users: fromJS([]),
    usersLoading: false,
    getUsers: () => {},
    toggleStatusUser: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('it should have TableData', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(TableData).length
    ).toEqual(1)
  })

  it('it should have Button', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(Button).length
    ).toEqual(1)
  })

  describe('mapDispatchToProps', () => {
    describe('getUsers', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.getUsers).toBeDefined()
      })

      it('should dispatch getUsers when called', () => {
        const payload = {}
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.getUsers(payload)
        expect(dispatch).toHaveBeenCalledWith(getUsersActions(payload))
      })
    })

    describe('toggleStatusUser', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.toggleStatusUser).toBeDefined()
      })

      it('should dispatch toggleStatusUser when called', () => {
        const payload = { id: 1 }
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.toggleStatusUser(payload)
        expect(dispatch).toHaveBeenCalledWith(toggleStatusUserActions(payload))
      })
    })
  })
})
