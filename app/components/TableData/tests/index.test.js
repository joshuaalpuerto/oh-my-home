/**
 * Testing our Button component
 */

import React from 'react'
import { shallow } from 'enzyme'

import TableData from '../index'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <TableData {...props}>
    {children}
  </TableData>
)

describe('<TableData />', () => {
  const minProps = {
    tableHeader: (<div />),
    tableBody: (<div />)
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
