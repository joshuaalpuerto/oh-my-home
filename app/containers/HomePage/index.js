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
import {
  equals
} from 'ramda'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import { ucFirst } from 'utils/strings'

import H2 from 'components/H2'
import TableData from 'components/TableData'
import Button from 'components/Button'

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

import {
  TableHeaderName,
  TableHeaderStatus,
  TDCenter,
  ButtonWrapper,
  ButtonOptionWrapper
} from './styled'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    const { users, usersLoading, getUsers } = this.props
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
          <TableData
            loading={usersLoading}
            isEmpty={equals(0, users.size)}
            tableHeader={
              <tr>
                <TableHeaderName>
                  <FormattedMessage {...messages.tableHeaderName} />
                </TableHeaderName>
                <TableHeaderStatus>
                  <FormattedMessage {...messages.tableHeaderStatus} />
                </TableHeaderStatus>
                <th> <FormattedMessage {...messages.tableHeaderOptions} /> </th>
              </tr>
            }
            tableBody={
              users.map((user) => (
                <tr key={user.get('id')}>
                  <td> {`${ucFirst(user.getIn(['name', 'title']))} ${ucFirst(user.getIn(['name', 'last']))}, ${ucFirst(user.getIn(['name', 'first']))}`} </td>
                  <TDCenter> Active </TDCenter>
                  <TDCenter>
                    <ButtonOptionWrapper>
                      <Button handleRoute={getUsers} >
                        <FormattedMessage {...messages.viewButton} />
                      </Button>
                      <Button handleRoute={getUsers} >
                        <FormattedMessage {...messages.deleteButton} />
                      </Button>
                    </ButtonOptionWrapper>
                  </TDCenter>
                </tr>
              ))
            }
          />
          <ButtonWrapper>
            <Button handleRoute={getUsers} disabled={usersLoading}>
              <FormattedMessage {...messages.addUsersButton} />
            </Button>
          </ButtonWrapper>
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
