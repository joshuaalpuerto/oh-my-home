/**
 * Test the UsersPage
 */

import React from 'react'
import { fromJS } from 'immutable'
import { shallow, mount } from 'enzyme'
import { Select } from 'antd'

import { Autocomplete, mapDispatchToProps } from '../index'
import {
  getAutoCompleteAction,
  getRecentSearchAction,
  updateRecentSearchAction
} from '../actions'

const { Option } = Select

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Autocomplete {...props} />
)

describe('<Autocomplete />', () => {
  const minProps = {
    options: fromJS([]),
    recentSearches: fromJS([]),
    optionsLoading: false,
    getAutoComplete: () => {},
    getRecentSearch: () => {},
    updateRecentSearch: () => {},
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

  describe('shouldTrigger getAutocomplete', () => {
    it('should call getAutoComplete after 800ms if value exist', () => {
      const props = {
        ...minProps,
        getAutoComplete: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component._fetchUser(1)
      expect(
        component.props.getAutoComplete
      ).toBeCalled()
    })

    it('should NOT call getAutoComplete if value empty', () => {
      const props = {
        ...minProps,
        getAutoComplete: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component._fetchUser()
      expect(
        component.props.getAutoComplete
      ).toHaveBeenCalledTimes(0)
    })
  })

  describe('componentDidMount', () => {
    it('should trigger onUpdate', () => {
      const props = {
        ...minProps,
        defaultPlaceValue: 'Singapore',
        defaultPlaceId: '123',
        onUpdate: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component.componentDidMount()
      expect(
        component.props.onUpdate
      ).toBeCalled()
    })

    it('should NOT trigger onUpdate', () => {
      const props = {
        ...minProps,
        onUpdate: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component.componentDidMount()
      expect(
        component.props.onUpdate
      ).toHaveBeenCalledTimes(0)
    })

    it('should trigger getAutoComplete', () => {
      const props = {
        ...minProps,
        defaultPlaceValue: 'Singapore',
        defaultPlaceId: '123',
        getAutoComplete: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component.componentDidMount()
      expect(
        component.props.getAutoComplete
      ).toBeCalled()
    })

    it('should NOT trigger getAutoComplete', () => {
      const props = {
        ...minProps,
        getAutoComplete: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component.componentDidMount()
      expect(
        component.props.getAutoComplete
      ).toHaveBeenCalledTimes(0)
    })
  })

  describe('Spin', () => {
    it('should have Spin', () => {
      const props = {
        ...minProps,
        options: fromJS([{
          place_id: '123',
          description: 'name'
        }]),
        optionsLoading: true
      }
      const renderComponent = wrapper(props, mount)
      expect(
        renderComponent.find(Select).prop('notFoundContent')
      ).toBeDefined()
    })

    it('should have no Spinner', () => {
      const renderComponent = wrapper(minProps, mount)
      expect(
        renderComponent.find(Select).prop('notFoundContent')
      ).toBeNull()
    })
  })

  describe('should have Option', () => {
    it('should exist if options have value', () => {
      const props = {
        ...minProps,
        options: fromJS([{
          place_id: '123',
          description: 'name'
        }])
      }
      const renderComponent = wrapper(props)
      expect(
        renderComponent.find(Option).length
      ).toEqual(1)
    })

    it('should exist if recentSearches have value', () => {
      const props = {
        ...minProps,
        recentSearches: fromJS([{
          value: '123',
          description: 'name'
        }])
      }
      const renderComponent = wrapper(props)
      expect(
        renderComponent.find(Option).length
      ).toEqual(1)
    })
  })

  it('should update state on change', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    component._handleChange('test1')
    expect(
      component.state.value
    ).toEqual('test1')
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

    describe('getRecentSearch', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.getRecentSearch).toBeDefined()
      })

      it('should dispatch getRecentSearch when called', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.getRecentSearch()
        expect(dispatch).toHaveBeenCalledWith(getRecentSearchAction())
      })
    })

    describe('updateRecentSearch', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.updateRecentSearch).toBeDefined()
      })

      it('should dispatch updateRecentSearch when called', () => {
        const payload = {}
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.updateRecentSearch(payload)
        expect(dispatch).toHaveBeenCalledWith(updateRecentSearchAction(payload))
      })
    })
  })
})
