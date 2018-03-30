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
  partial
} from 'ramda'

import LoadingIndicator from 'components/LoadingIndicator'
import EmptyState from 'components/EmptyState'

import messages from './messages'

const TableWrapper = styled.table`
  width: 100%
`

class TableData extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  _displayEmpty = () => {
    return (
      <tbody>
        <tr>
          <td colSpan={999}>
            <EmptyState message={<FormattedMessage {...messages.emptyState} />} />
          </td>
        </tr>
      </tbody>
    )
  }

  _displayLoading = () => {
    return (
      <tbody>
        <tr>
          <td colSpan={999}>
            <LoadingIndicator />
          </td>
        </tr>
      </tbody>
    )
  }

  _displayBody = () => {
    const { tableBody, isEmpty, loading } = this.props
    const display = cond([
      [equals(true), this._displayLoading],
      [both(equals(false), partial(equals(true), [isEmpty])), this._displayEmpty],
      [both(equals(false), partial(equals(false), [isEmpty])), () => tableBody]
    ])
    return display(loading)
  }

  render () {
    const { tableHeader } = this.props
    return (
      <TableWrapper>
        { tableHeader }
        { this._displayBody() }
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
