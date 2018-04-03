/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import UsersPage from 'containers/UsersPage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Footer from 'components/Footer'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

export default function App () {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate='%s - Oh My Home'
        defaultTitle='Oh My Home'
      >
        <meta name='description' content='A Oh My Home application' />
      </Helmet>
      <Switch>
        <Route exact path='/' component={UsersPage} />
        <Route path='' component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  )
}
