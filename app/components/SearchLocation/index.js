/**
 *
 * SearchLocation
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Select, Row, Col } from 'antd'
import {
  isEmpty
} from 'ramda'

import Autocomplete from 'containers/Autocomplete'
import Button from 'components/Button'

import messages from './messages'

const Option = Select.Option

export class SearchLocation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    flatType: '',
    location: {}
  }

  _handleUpdateKeyState= (key) => (value) => {
    this.setState({
      [key]: value
    })
  }

  _handleSearch = () => {
    this.props.onSearch(this.state)
  }

  _shouldBeDisabled = () => {
    const { flatType, location } = this.state
    return !flatType || isEmpty(location)
  }

  render () {
    const { intl, search, flatType } = this.props
    return (
      <Row gutter={16} type='flex' justify='center' align='middle'>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Autocomplete
            onUpdate={this._handleUpdateKeyState('location')}
            defaultValue={search}
          />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Select
            size='large'
            defaultValue={flatType}
            placeholder={intl.formatMessage(messages.flatTypePlaceholder)}
            style={{ width: '100%' }}
            onChange={this._handleUpdateKeyState('flatType')}
          >
            <Option value='room2'>2 Rooms</Option>
            <Option value='room3'>3 Rooms</Option>
            <Option value='room4' >4 Rooms</Option>
            <Option value='room5'>5 Rooms</Option>
            <Option value='exec-hbd'>Executive HDB</Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Button disabled={this._shouldBeDisabled()} handleRoute={this._handleSearch}>
            <FormattedMessage {...messages.buttonSearch} />
          </Button>
        </Col>
      </Row>
    )
  }
}

SearchLocation.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  flatType: PropTypes.string,
  intl: intlShape.isRequired
}

export default injectIntl(SearchLocation)
