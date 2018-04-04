/**
 *
 * Autocomplete
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Select, Spin } from 'antd'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import {
  getAutoCompleteAction
} from './actions'
import {
  selectOptions,
  selectOptionsLoading
} from './selectors'

const Option = Select.Option

export class Autocomplete extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    options: PropTypes.object.isRequired,
    optionsLoading: PropTypes.bool.isRequired,
    getAutoComplete: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  }

  state = {
    value: ''
  }

  constructor (props) {
    super(props)

    this._fetchUser = debounce(this._fetchUser, 800)
  }

  _fetchUser = (value) => {
    this.props.getAutoComplete(value)
  }

  _handleChange = (value) => {
    this.setState({ value })
  }

  render () {
    const { options, optionsLoading, intl } = this.props
    const { value } = this.state
    return (
      <Select
        allowClear
        size='large'
        mode='combobox'
        showArrow={false}
        value={value}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        notFoundContent={optionsLoading ? <Spin size='small' /> : null}
        filterOption={false}
        onSearch={this._fetchUser}
        onChange={this._handleChange}
        style={{ width: '100%' }}
      >
        {
          options.map((option) => (
            <Option key={option.get('id')} value={option.get('description')}>
              {option.get('description')}
            </Option>
          ))
        }
      </Select>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  options: selectOptions(),
  optionsLoading: selectOptionsLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getAutoComplete: (str) => dispatch(getAutoCompleteAction(str)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'autocomplete', reducer })
const withSaga = injectSaga({ key: 'autocomplete', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(Autocomplete))
