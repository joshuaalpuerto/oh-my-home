/**
 * Test the UsersPage
 */

import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import { Autocomplete, mapDispatchToProps } from '../index'
import {
  getAutoCompleteAction
} from '../actions'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Autocomplete {...props} />
)

describe('<Autocomplete />', () => {
  const minProps = {
    options: fromJS([]),
    optionsLoading: false,
    getAutoComplete: () => {},
    dispatch: () => {},
    onUpdate: () => {},
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

  it('should update state', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    component._handleChange('test')
    expect(
      component.state.value
    ).toEqual('test')
  })

  it('should call getAutoComplete after 800ms', () => {
    const props = {
      ...minProps,
      getAutoComplete: jest.fn()
    }
    const renderComponent = wrapper(props)
    const component = renderComponent.instance()
    component._fetchUser(1)

    setTimeout(() => {
      expect(
        component.props.getAutoComplete
      ).toBeCalled()
    }, 800)
  })

  describe('mapDispatchToProps', () => {
    describe('getAutoComplete', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.getAutoComplete).toBeDefined()
      })

      it('should dispatch getAutoComplete when called', () => {
        const payload = {}
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.getAutoComplete(payload)
        expect(dispatch).toHaveBeenCalledWith(getAutoCompleteAction(payload))
      })
    })
  })
})
