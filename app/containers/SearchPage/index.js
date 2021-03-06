/**
 *
 * SearchPage
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { Row } from 'antd'

import H1 from 'components/H1'
import Container from 'components/Container'
import SearchLocation from 'components/SearchLocation'

import messages from './messages'

const SearchWrapper = styled.div`
  position: relative;
  background: #72C7DB;
  height: 300px;
  min-height: 300px;
  position: relative;
  width: 100%;
`

const SearchContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin: 100px  auto 0;
  position: relative;
  height: 100%;
  z-index: 2;
`

const RowWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled(H1)`
  text-align: center;
  color: #FFF;
`

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired
  }

  _handleSearchUpdate = ({ flatType, location: { value, description } }) => {
    this.props.changeRoute(`/map-page?place_id=${value}&flatType=${flatType}&q=${encodeURIComponent(description)}`)
  }

  render () {
    return (
      <SearchWrapper>
        <Helmet>
          <title>SearchPage</title>
          <meta name='description' content='Description of SearchPage' />
        </Helmet>
        <SearchContainer>
          <RowWrapper>
            <Title>
              <FormattedMessage {...messages.pageTitle} />
            </Title>
            <SearchLocation
              onSearch={this._handleSearchUpdate}
            />
          </RowWrapper>
        </SearchContainer>
      </SearchWrapper>
    )
  }
}

export function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(
  withConnect
)(SearchPage)
