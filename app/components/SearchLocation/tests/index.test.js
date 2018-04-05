/**
 * Test the UsersPage
 */

import React from 'react'
// import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import { SearchLocation } from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <SearchLocation {...props} />
)

describe('<SearchLocation />', () => {
  const minProps = {
    onSearch: () => {},
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  describe('should update state', () => {
    it('should update flatType', () => {
      const renderComponent = wrapper(minProps)
      const component = renderComponent.instance()
      const handle = component._handleUpdateKeyState('flatType')
      handle('test')
      expect(
        component.state.flatType
      ).toEqual('test')
    })

    it('should update location', () => {
      const renderComponent = wrapper(minProps)
      const component = renderComponent.instance()
      const handle = component._handleUpdateKeyState('location')
      handle('test')
      expect(
        component.state.location
      ).toEqual('test')
    })
  })

  it('should call _handleSearch', () => {
    const props = {
      ...minProps,
      onSearch: jest.fn()
    }
    const renderComponent = wrapper(props)
    const component = renderComponent.instance()
    component._handleSearch({})
    expect(
      component.props.onSearch
    ).toBeCalled()
  })

  it('Initial should be disabled', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()

    expect(
      component._shouldBeDisabled()
    ).toEqual(true)
  })

  it('If both values should not be disabled', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    component.setState({flatType: 1, location: 1})
    expect(
      component._shouldBeDisabled()
    ).toEqual(false)
  })
})
