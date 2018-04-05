/**
 *
 * SearchLocation
 *
 */

import React from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Select, Row, Col } from 'antd'

import Autocomplete from 'containers/Autocomplete'
import Button from 'components/Button'

import messages from './messages'

const Option = Select.Option

export class SearchLocation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    flatType: ''
  }

  _handleFlatChange = (value) => {
    this.setState({
      flatType: value
    })
  }

  render () {
    const { intl } = this.props
    return (
      <Row gutter={16} type='flex' justify='center' align='middle'>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Autocomplete />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Select
            size='large'
            placeholder={intl.formatMessage(messages.flatTypePlaceholder)}
            style={{ width: '100%' }}
            onChange={this._handleFlatChange}
            >
            <Option value='room2'>2 Rooms</Option>
            <Option value='room3'>3 Rooms</Option>
            <Option value='room4' >4 Rooms</Option>
            <Option value='room5'>5 Rooms</Option>
            <Option value='exec-hbd'>Executive HDB</Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Button>
            <FormattedMessage {...messages.buttonSearch} />
          </Button>
        </Col>
      </Row>
    )
  }
}

SearchLocation.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(SearchLocation)