/**
 * Test the UsersPage
 */

import React from 'react'
import { shallow } from 'enzyme'
import { push } from 'react-router-redux'

import { SearchPage, mapDispatchToProps } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <SearchPage {...props}>
    {children}
  </SearchPage>
)

describe('<SearchPage />', () => {
  const minProps = {
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    },
    changeRoute: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should trigger changeRoute', () => {
    const props = {
      ...minProps,
      changeRoute: jest.fn()
    }
    const renderComponent = wrapper(props)
    const component = renderComponent.instance()
    component._handleSearchUpdate({
      flatType: 'room2',
      location: {
        value: 'value',
        description: 'description'
      }
    })

    expect(
      component.props.changeRoute
    ).toBeCalled()
  })

  describe('changeRoute', () => {
    it('should be injected', () => {
      const dispatch = jest.fn()
      const result = mapDispatchToProps(dispatch)
      expect(result.changeRoute).toBeDefined()
    })

    it('should dispatch changeRoute when called', () => {
      const url = '/'
      const dispatch = jest.fn()
      const result = mapDispatchToProps(dispatch)
      result.changeRoute(url)
      expect(dispatch).toHaveBeenCalledWith(push(url))
    })
  })
})
