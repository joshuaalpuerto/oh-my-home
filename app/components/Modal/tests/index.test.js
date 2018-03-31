/**
 * Testing our Modal component
 */

import React from 'react'
import { shallow } from 'enzyme'

import Modal from '../index'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Modal {...props}>
    {children}
  </Modal>
)

describe('<Modal />', () => {
  const minProps = {
    children: (<h1> test </h1>),
    open: false,
    handleToggle: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
