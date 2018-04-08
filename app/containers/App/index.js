/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import HomePage from 'containers/HomePage/Loadable'
import SearchPage from 'containers/SearchPage/Loadable'
import MapPage from 'containers/MapPage/Loadable'
import UsersPage from 'containers/UsersPage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Footer from 'components/Footer'

const { Content } = Layout

const AppWrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

export default function App () {
  return (
    <AppWrapper>
      <Layout>
        <Helmet
          titleTemplate='%s - Oh My Home'
          defaultTitle='Oh My Home'
        >
          <meta name='description' content='A Oh My Home application' />
        </Helmet>
        <Content>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/map-page' component={MapPage} />
            <Route exact path='/users' component={UsersPage} />
            <Route path='' component={NotFoundPage} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </AppWrapper>
  )
}
