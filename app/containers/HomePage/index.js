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
import { switchFn } from 'utils/logic'

import Toggle from 'components/Toggle'
import H2 from 'components/H2'
import TableData from 'components/TableData'
import Button from 'components/Button'

import DetailsModal from './DetailsModal'
import Section from './Section'
import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  FILTERS
} from './constants'

import {
  getUsersActions,
  toggleStatusUserActions
} from './actions'
import {
  selectUsers,
  selectUsersActive,
  selectUsersInActive,
  selectUsersLoading
} from './selectors'

import {
  ButtonOptionWrapper,
  ButtonWrapper,
  FilterWrapper,
  TDCenter,
  TableHeaderName,
  TableHeaderStatus
} from './styled'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    filter: 'all',
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

  _handleFilter = (evt) => {
    // We cannot use the target since its synthetic event issue.
    const filter = evt.target ? evt.target.value : 'all'
    this.setState(() => ({
      filter: filter
    }))
  }

  _dataHandler = (filter) => {
    return switchFn({
      active: this.props.usersActive,
      inActive: this.props.usersInActive
    })(this.props.users)(filter)
  }

  render () {
    const { usersLoading, getUsers, toggleStatusUser } = this.props
    const { filter, modal, selectedUser } = this.state
    const data = this._dataHandler(filter)
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
          <FilterWrapper>
            <FormattedMessage {...messages.pageFilter} />
            <Toggle
              value={filter}
              values={FILTERS}
              messages={messages}
              onToggle={this._handleFilter}
              />
          </FilterWrapper>
          <TableData
            loading={usersLoading}
            isEmpty={equals(0, data.size)}
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
              data.map((user, userIdx) => (
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
  usersActive: PropTypes.object.isRequired,
  usersInActive: PropTypes.object.isRequired,
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
  usersActive: selectUsersActive(),
  usersInActive: selectUsersInActive(),
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
