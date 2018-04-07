/**
 * Test the UsersPage
 */

import React from 'react'
import { shallow } from 'enzyme'

import GoogleMap from '../GoogleMap'
import {
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
})
