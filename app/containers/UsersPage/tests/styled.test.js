/**
 * Testing our Modal component
 */

import React from 'react'
import { shallow } from 'enzyme'

import {
  AvatarWrapper,
  ButtonOptionWrapper,
  ButtonWrapper,
  ListWrapper,
  TDCenter,
  TableHeaderName,
  TableHeaderStatus
} from '../styled'

const children = 'Test'
const wrapper = (Component, props = {}, enzyme = shallow) => enzyme(
  <Component {...props}>
    {children}
  </Component>
)

describe('<Modal /> Styled', () => {
  describe('<AvatarWrapper />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(AvatarWrapper, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<ButtonOptionWrapper />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ButtonOptionWrapper, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<ButtonWrapper />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ButtonWrapper, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<ListWrapper />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(ListWrapper, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<TDCenter />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(TDCenter, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<TableHeaderName />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(TableHeaderName, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })

  describe('<TableHeaderStatus />', () => {
    it('render without exploding', () => {
      const renderComponent = wrapper(TableHeaderStatus, {})
      expect(
        renderComponent.length
      ).toEqual(1)
    })
  })
})
