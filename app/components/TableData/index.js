/**
*
* TableData
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TableWrapper = styled.table`
  width: 100%
`

class TableData extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { tableHeader, tableBody } = this.props
    return (
      <TableWrapper>
        { tableHeader }
        { tableBody }
      </TableWrapper>
    )
  }
}

TableData.propTypes = {
  tableHeader: PropTypes.node.isRequired,
  tableBody: PropTypes.node.isRequired
}

export default TableData
