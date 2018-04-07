/**
 * Testing our Button component
 */

import React from 'react'
import { shallow } from 'enzyme'

import EmptyState from 'components/EmptyState'
import LoadingIndicator from 'components/LoadingIndicator'
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
    tableBody: (<div />),
    isEmpty: false,
    loading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('render displayEmpty', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    const displayEmpty = shallow(component._displayEmpty())
    expect(
      displayEmpty.find(EmptyState).length
    ).toEqual(1)
  })

  it('render displayLoading', () => {
    const renderComponent = wrapper(minProps)
    const component = renderComponent.instance()
    const displayLoading = shallow(component._displayLoading())
    expect(
      displayLoading.find(LoadingIndicator).length
    ).toEqual(1)
  })
})
