/**
 * Test the UsersPage
 */

import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { replace } from 'react-router-redux'

import { MapPage, mapDispatchToProps } from '../index'
import {
  getPlaceAction
} from '../actions'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <MapPage {...props}>
    {children}
  </MapPage>
)

describe('<MapPage />', () => {
  const minProps = {
    place: fromJS({}),
    placeLoading: false,
    getPlace: () => {},
    changeRoute: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  describe('mapDispatchToProps', () => {
    describe('getPlace', () => {
      it('should be injected', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.getPlace).toBeDefined()
      })

      it('should dispatch getPlace when called', () => {
        const payload = {}
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.getPlace(payload)
        expect(dispatch).toHaveBeenCalledWith(getPlaceAction(payload))
      })
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
        expect(dispatch).toHaveBeenCalledWith(replace(url))
      })
    })
  })
})
