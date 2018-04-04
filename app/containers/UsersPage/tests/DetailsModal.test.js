/**
 * Test the HomePage
 */

import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import A from 'components/A'
import H2 from 'components/H2'
import H3 from 'components/H3'
import Modal from 'components/Modal'
import Img from 'components/Img'

import DetailsModal from '../DetailsModal'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <DetailsModal {...props}>
    {children}
  </DetailsModal>
)

describe('<DetailsModal />', () => {
  const minProps = {
    open: false,
    selectedUser: fromJS({}),
    handleToggle: () => {},
    getFullName: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('it should have A', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(A).length
    ).toEqual(1)
  })

  it('it should have H2', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(H2).length
    ).toEqual(1)
  })

  it('it should have H3', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(H3).length
    ).toEqual(1)
  })

  it('it should have Modal', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(Modal).length
    ).toEqual(1)
  })

  it('it should have Img', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(Img).length
    ).toEqual(1)
  })
})
