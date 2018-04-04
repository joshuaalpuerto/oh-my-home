/**
 * Test the HomePage
 */

import React from 'react'
import { shallow } from 'enzyme'
import { push } from 'react-router-redux'

import { HomePage, mapDispatchToProps } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <HomePage {...props}>
    {children}
  </HomePage>
)

describe('<HomePage />', () => {
  const minProps = {
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
        expect(dispatch).toHaveBeenCalledWith(push(url))
      })
    })
  })
})
