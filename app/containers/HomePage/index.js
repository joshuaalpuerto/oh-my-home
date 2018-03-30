/*
 * HomePage
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import H2 from 'components/H2'
import Section from './Section'
import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getUsersActions
} from './actions'
import {
  selectUsers,
  selectUsersLoading
} from './selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <article>
        <Helmet>
          <title>Users</title>
          <meta name='description' content="A Oh My Home application user\'s lists" />
        </Helmet>
        <div>
          <Section>
            <H2>
              <FormattedMessage {...messages.pageTitle} />
            </H2>
          </Section>
        </div>
      </article>
    )
  }
}

HomePage.propTypes = {
  users: PropTypes.object.isRequired,
  usersLoading: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired
}

export function mapDispatchToProps (dispatch) {
  return {
    getUsers: (payload) => dispatch(getUsersActions(payload)),
    dispatch
  }
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers(),
  usersLoading: selectUsersLoading()
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'home', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage)
