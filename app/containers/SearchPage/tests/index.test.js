/**
 * Test the UsersPage
 */

import React from 'react'
import { shallow } from 'enzyme'

import { SearchPage } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <SearchPage {...props}>
    {children}
  </SearchPage>
)

describe('<SearchPage />', () => {
  const minProps = {
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {}
    },
    changeRoute: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  // it('should handle filter active', () => {
  //   const renderComponent = wrapper(minProps)
  //   const component = renderComponent.instance()
  //   component._handleFilter({ target: { value: 'active' } })
  //   expect(
  //     component.state.filter
  //   ).toEqual('active')
  // })
})
