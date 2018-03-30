/**
*
* TableData
*
*/

import React from 'react'
import PropTypes from 'prop-types'

class TableData extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { tableHeader, tableBody } = this.props
    return (
      <table>
        { tableHeader }
        { tableBody }
      </table>
    )
  }
}

TableData.propTypes = {
  tableHeader: PropTypes.node.isRequired,
  tableBody: PropTypes.node.isRequired
}

export default TableData
