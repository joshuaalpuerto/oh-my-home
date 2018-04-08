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
import {
  MAP_PHOTO_URL,
  MAP_KEY
} from '../constants'

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
    dispatch: () => {},
    location: {
      search: ''
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should  _updateStatePlace if place is defined', () => {
    const place = fromJS({
      result: {
        geometry: {
          location: {
            lat: 1.2,
            lng: 2.1
          }
        }
      }
    })

    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    component._updateStatePlace(place)

    expect({
      images: component.state.images,
      lat: component.state.lat,
      lng: component.state.lng
    }).toEqual({
      images: [],
      lat: 1.2,
      lng: 2.1
    })
  })

  it('should  have images set for  _updateStatePlace', () => {
    const photoReference = 1234567
    const place = fromJS({
      result: {
        geometry: {
          location: {
            lat: 1.2,
            lng: 2.1
          }
        },
        photos: [{
          photo_reference: photoReference
        }]
      }
    })

    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    component._updateStatePlace(place)

    expect({
      images: component.state.images,
      lat: component.state.lat,
      lng: component.state.lng
    }).toEqual({
      images: [`${MAP_PHOTO_URL}=${photoReference}&key=${MAP_KEY}`],
      lat: 1.2,
      lng: 2.1
    })
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

  describe('componentDidMount', () => {
    it('should trigger getPlace on mount', () => {
      const props = {
        ...minProps,
        getPlace: jest.fn(),
        location: {
          search: '?place_id=ChIJFXzxL2Aa2jERnoWTOdJdVKk&flatType=room3&q=Dover%20Road%2C%20Singapore%20Polytechnic%2C%20Singapore'
        }
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      component.componentDidMount()
      expect(
        component.props.getPlace
      ).toBeCalled()
    })
  })

  describe('componentWillReceiveProps', () => {
    it('should trigger getPlace if search is not empty', () => {
      const location = {
        search: '?place_id=ChIJFXzxL2Aa2jERnoWTOdJdVKk&flatType=room3&q=Dover%20Road%2C%20Singapore%20Polytechnic%2C%20Singapore'
      }
      const props = {
        ...minProps,
        getPlace: jest.fn()
      }
      const renderComponent = wrapper(props)
      const component = renderComponent.instance()
      renderComponent.setProps({
        location
      })
      expect(
        component.props.getPlace
      ).toBeCalled()
    })
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
