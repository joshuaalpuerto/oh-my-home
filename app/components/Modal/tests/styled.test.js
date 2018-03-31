/**
 * Testing our Modal component
 */

import React from 'react'
import { shallow, mount } from 'enzyme'

import {
  ModalContainer,
  ModalWrapper,
  ModalContent,
  ModalFooter
} from '../styled'

const children = 'Test'
const wrapper = (Component, props = {}, enzyme = shallow) => enzyme(
  <Component {...props}>
    {children}
  </Component>
)

describe('<Modal /> Styled', () => {
  describe('<ModalContainer />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ModalContainer, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })

    it('should open true', () => {
      const renderComponent = wrapper(ModalContainer, { open: true }, mount)
      expect(
        renderComponent.props().open
      ).toEqual(true)
    })

    it('should open false', () => {
      const renderComponent = wrapper(ModalContainer, { open: false }, mount)
      expect(
        renderComponent.props().open
      ).toEqual(false)
    })
  })

  describe('<ModalWrapper />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ModalWrapper, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<ModalContent />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ModalContent, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<ModalFooter />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ModalFooter, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })
})
