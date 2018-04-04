/**
 *
 * SearchPage
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Select, Row, Col } from 'antd'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import H1 from 'components/H1'
import Autocomplete from 'containers/Autocomplete'
import Container from 'components/Container'
import Button from 'components/Button'

import makeSelectSearchPage from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

const Option = Select.Option

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
          </RowWrapper>
        </SearchContainer>
      </SearchWrapper>
    )
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired
}

const mapStateToProps = createStructuredSelector({
  searchpage: makeSelectSearchPage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'searchPage', reducer })
const withSaga = injectSaga({ key: 'searchPage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(SearchPage))
