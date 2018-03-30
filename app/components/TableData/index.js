/**
*
* TableData
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import {
  both,
  cond,
  equals,
  partial,
  ifElse
} from 'ramda'

import LoadingIndicator from 'components/LoadingIndicator'
import EmptyState from 'components/EmptyState'

import messages from './messages'

const TableWrapper = styled.table`
  width: 100%
`

const HeaderWrapper = styled.thead`
  border-bottom: 1px solid #C8C8C8;
`

class TableData extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  _displayEmpty = () => {
    return (
      <tr>
        <td colSpan={999}>
          <EmptyState message={<FormattedMessage {...messages.emptyState} />} />
        </td>
      </tr>
    )
  }

  _displayLoading = () => {
    return (
      <tr>
        <td colSpan={999}>
          <LoadingIndicator />
        </td>
      </tr>
    )
  }

  _displayBody = () => {
    const { tableBody, isEmpty, loading } = this.props
    const display = cond([
      [both(equals(true), partial(equals(true), [isEmpty])), this._displayLoading],
      [both(equals(false), partial(equals(true), [isEmpty])), this._displayEmpty],
      [partial(equals(false), [isEmpty]), () => tableBody]
    ])
    return display(loading)
  }

  _displayEndLoading = () => {
    const { loading, isEmpty } = this.props
    const display = ifElse(
      both(equals(true), partial(equals(false), [isEmpty])),
      this._displayLoading,
      () => null
    )

    return display(loading)
  }

  render () {
    const { tableHeader } = this.props
    return (
      <TableWrapper>
        <HeaderWrapper>
          { tableHeader }
        </HeaderWrapper>
        <tbody>
          { this._displayBody() }
          { this._displayEndLoading() }
        </tbody>
      </TableWrapper>
    )
  }
}

TableData.propTypes = {
  tableHeader: PropTypes.node.isRequired,
  tableBody: PropTypes.node.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export default TableData
