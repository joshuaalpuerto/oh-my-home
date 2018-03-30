import { fromJS } from 'immutable'

import {
  selectGlobal,
  selectRoute
} from '../selectors'

describe('App Domains Selectors', () => {
  it('should select the global state', () => {
    const globalState = fromJS({})
    const mockedState = fromJS({
      global: globalState
    })
    expect(selectGlobal(mockedState)).toEqual(globalState)
  })

  it('should select the route state', () => {
    const routeState = fromJS({})
    const mockedState = fromJS({
      route: routeState
    })
    expect(selectRoute(mockedState)).toEqual(routeState)
  })
})
