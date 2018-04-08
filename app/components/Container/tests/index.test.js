/**
 * Testing our Modal component
 */

import React from 'react'
import { shallow } from 'enzyme'

import Container from '../index'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Container {...props}>
    {children}
  </Container>
)

describe('<Container />', () => {
  const minProps = {
    children: (<h1> test </h1>)
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
