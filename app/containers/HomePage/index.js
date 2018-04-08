/**
 *
 * HomePage
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import { Row, Col } from 'antd'

import OMHApp from 'images/home/ohmyhome-app.png'

import Img from 'components/Img'
import Container from 'components/Container'
import H1 from 'components/H1'
import Button from 'components/Button'

import messages from './messages'

const HomeWrapper = styled.div`
  position: relative;
  background: #72C7DB;
  min-height: 300px;
  position: relative;
  width: 100%;
`

const HomeContainer = styled(Container)`
  display: flex;
  margin: 100px  auto 0;
  position: relative;
  z-index: 2;
`

const ImageWrapper = styled.div`
  flex: 1;
  max-width: 400px;

  & img {
    width: 100%;
  }
`
const RowWrapper = styled(Row)`
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const TopBanner = styled.div`
  position: absolute;
  z-index: 1;
  top: -1px;
  width: 100%;
  background: #F0F2F5;
  height: 26%;

  @media (max-width: 764px) {
    display:none;
  }
`

const Title = styled(H1)`
  font-size: 38px;
  color: #FFF;
  text-align: center;
`

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  _handleUsersRoute = () => {
    this.props.changeRoute('/users')
  }

  _handleSearchRoute = () => {
    this.props.changeRoute('/search')
  }

  render () {
    return (
      <HomeWrapper>
        <Helmet>
          <title>Home</title>
          <meta name='description' content='A Oh My Home HomePage' />
        </Helmet>
        <HomeContainer>
          <RowWrapper gutter={16} type='flex' justify='center' align='middle'>
            <Col xs={0} sm={0} md={8} lg={8} xl={8}>
              <ImageWrapper>
                <Img alt='app' src={OMHApp} />
              </ImageWrapper>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16} value={100}>
              <Title><FormattedMessage {...messages.pageTitle} /></Title>
              <ButtonWrapper>
                <Button handleRoute={this._handleSearchRoute}>
                  <FormattedMessage {...messages.buttonSearchLocation} />
                </Button>
                <Button handleRoute={this._handleUsersRoute}>
                  <FormattedMessage {...messages.buttonUserGenerator} />
                </Button>
              </ButtonWrapper>
            </Col>
          </RowWrapper>
        </HomeContainer>
        <TopBanner />
      </HomeWrapper>
    )
  }
}

HomePage.propTypes = {
  changeRoute: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
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
)(HomePage)
