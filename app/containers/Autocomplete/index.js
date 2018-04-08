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
  getAutoCompleteAction,
  getRecentSearchAction,
  updateRecentSearchAction
} from './actions'
import {
  selectOptions,
  selectOptionsLoading,
  selectRecentSearches
} from './selectors'

const { Option, OptGroup } = Select

export class Autocomplete extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    defaultValue: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    recentSearches: PropTypes.object.isRequired,
    optionsLoading: PropTypes.bool.isRequired,
    getRecentSearch: PropTypes.func.isRequired,
    updateRecentSearch: PropTypes.func.isRequired,
    getAutoComplete: PropTypes.func.isRequired,
    intl: intlShape.isRequired
  }

  state = {
    value: ''
  }

  constructor (props) {
    super(props)

    this._fetchUserDebounce = debounce(this._fetchUser, 800)
  }

  _fetchUser = (value) => {
    if (value) {
      this.props.getAutoComplete(value)
    }
  }

  _handleChange = (value) => {
    this.setState({
      value
    })
  }

  _handleSelection = (description, { key: value }) => {
    const { onUpdate, updateRecentSearch } = this.props
    const payload = { value, description }
    onUpdate(payload)
    updateRecentSearch(payload)
  }

  componentDidMount () {
    const { defaultPlaceValue, defaultPlaceId, getRecentSearch } = this.props
    if (defaultPlaceValue) {
      this.props.getAutoComplete(defaultPlaceValue)
      this._handleSelection(defaultPlaceValue, {
        key: defaultPlaceId
      })
    }

    getRecentSearch()
  }

  render () {
    const { options, optionsLoading, recentSearches, intl, defaultPlaceValue } = this.props
    return (
      <Select
        allowClear
        size='large'
        mode='combobox'
        showArrow={false}
        defaultValue={defaultPlaceValue}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        notFoundContent={optionsLoading ? <Spin size='small' /> : null}
        filterOption={false}
        onSearch={this._fetchUserDebounce}
        onSelect={this._handleSelection}
        style={{ width: '100%' }}
      >
        <OptGroup label={intl.formatMessage(messages.results)}>
          {
          options.map((option) => (
            <Option key={option.get('place_id')} value={option.get('description')}>
              {option.get('description')}
            </Option>
          ))
        }
        </OptGroup>
        <OptGroup label={intl.formatMessage(messages.recentSearches)}>
          {
          recentSearches.map((option) => (
            <Option key={option.get('value')} value={option.get('description')}>
              {option.get('description')}
            </Option>
          ))
        }
        </OptGroup>
      </Select>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  options: selectOptions(),
  optionsLoading: selectOptionsLoading(),
  recentSearches: selectRecentSearches()
})

export function mapDispatchToProps (dispatch) {
  return {
    getAutoComplete: (str) => dispatch(getAutoCompleteAction(str)),
    getRecentSearch: () => dispatch(getRecentSearchAction()),
    updateRecentSearch: (search) => dispatch(updateRecentSearchAction(search)),
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
