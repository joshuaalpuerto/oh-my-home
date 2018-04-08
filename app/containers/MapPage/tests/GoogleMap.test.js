/**
 * Test the UsersPage
 */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { InfoWindow } from 'react-google-maps'

import Img from 'components/Img'

import GoogleMap, { MapComponent } from '../GoogleMap'
import {
  MAP_PHOTO_URL,
  MAP_KEY
} from '../constants'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <GoogleMap {...props} />
)

describe('<GoogleMap />', () => {
  const minProps = {
    lat: 1.123,
    lng: 2.123,
    images: [],
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`,
    loadingElement: (<div style={{ height: `100%` }} />),
    containerElement: (<div style={{ height: `80vh` }} />),
    mapElement: (<div style={{ height: `100%` }} />),
    center: { lat: 1.123, lng: 1.123 }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  describe('Testing Without DOM', () => {
    const props = {
      ...minProps,
      images: [`${MAP_PHOTO_URL}=1234567&key=${MAP_KEY}`]
    }
    const renderComponent = shallow(<MapComponent {...props} />)
    const component = renderComponent.instance()

    it('should match snapshot', () => {
      expect(
        renderComponent
      ).toMatchSnapshot()
    })

    describe('toggle infoWindow', () => {
      component._infoToggle()

      it('should equals true open state', () => {
        expect(
          component.state.open
        ).toEqual(true)
      })

      it('should have infoWindow defined', () => {
        expect(
          renderComponent.find(InfoWindow).length
        ).toEqual(1)
      })

      it('should have Img defined', () => {
        expect(
          renderComponent.find(Img).length
        ).toEqual(1)
      })
    })
  })

  describe('toggle InfoMarker', () => {
    const props = {
      ...minProps,
      images: [`${MAP_PHOTO_URL}=1234567&key=${MAP_KEY}`]
    }
    const renderComponent = wrapper(props, mount)
    renderComponent.setState({
      open: true
    })

    it('should have open state true', () => {
      expect(
        renderComponent.state().open
      ).toEqual(true)
    })
  })
})
