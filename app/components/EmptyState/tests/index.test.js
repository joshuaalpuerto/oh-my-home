import React from 'react'
import { shallow } from 'enzyme'

import EmptyState from '../index'
import Img from 'components/Img'

const renderComponent = (props = {}) => shallow(
  <EmptyState {...props} />
)

describe('<EmptyState />', () => {
  const minProps = {
    message: 'test'
  }

  it('should render without exploding', () => {
    const renderedComponent = renderComponent(minProps)
    expect(
      renderedComponent.length
    ).toEqual(1)
  })

  it('should have Img', () => {
    const renderedComponent = renderComponent(minProps)
    expect(renderedComponent.find(Img).length).toEqual(1)
  })
})
