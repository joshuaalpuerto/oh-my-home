/*
 * HomePage
 */

import React from 'react'
import PropTypes from 'prop-types'

import { fromJS } from 'immutable'
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

import DetailsModal from './DetailsModal'
import Section from './Section'
import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getUsersActions,
  toggleStatusUserActions
} from './actions'
import {
  selectUsers,
  selectUsersLoading
} from './selectors'

import {
  ButtonOptionWrapper,
  ButtonWrapper,
  TDCenter,
  TableHeaderName,
  TableHeaderStatus
} from './styled'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    modal: false,
    selectedUser: fromJS({})
  }

  _getFullName = (entity) => {
    return `${ucFirst(entity.getIn(['name', 'title']))} ${ucFirst(entity.getIn(['name', 'last']))}, ${ucFirst(entity.getIn(['name', 'first']))}`
  }

  _handleModal = (toggle = null, selected = {}) => {
    return () => {
      this.setState(({ modal }) => ({
        modal: toggle !== null ? toggle : !modal,
        selectedUser: fromJS(selected)
      }))
    }
  }

  render () {
    const { users, usersLoading, getUsers, toggleStatusUser } = this.props
    const { modal, selectedUser } = this.state
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
              users.map((user, userIdx) => (
                <tr key={user.get('id')}>
                  <td> {this._getFullName(user)} </td>
                  <TDCenter> {
                    user.get('deleted')
                      ? <FormattedMessage {...messages.infoInActive} />
                    : <FormattedMessage {...messages.infoActive} />
                  } </TDCenter>
                  <TDCenter>
                    <ButtonOptionWrapper>
                      <Button handleRoute={this._handleModal(true, user)} >
                        <FormattedMessage {...messages.viewButton} />
                      </Button>
                      <Button handleRoute={() => toggleStatusUser({ id: userIdx })} >
                        {
                        user.get('deleted')
                          ? <FormattedMessage {...messages.redoButton} />
                        : <FormattedMessage {...messages.deleteButton} />
                      }
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
        <DetailsModal
          open={modal}
          selectedUser={selectedUser}
          handleToggle={this._handleModal(false)}
          getFullName={this._getFullName}
        />
      </article>
    )
  }
}

HomePage.propTypes = {
  users: PropTypes.object.isRequired,
  usersLoading: PropTypes.bool.isRequired,
  getUsers: PropTypes.func.isRequired,
  toggleStatusUser: PropTypes.func.isRequired
}

export function mapDispatchToProps (dispatch) {
  return {
    getUsers: (payload) => dispatch(getUsersActions(payload)),
    toggleStatusUser: (payload) => dispatch(toggleStatusUserActions(payload)),
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
