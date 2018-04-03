import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import AvatarDefault from 'images/shared/avatar-default.png'

import A from 'components/A'
import H2 from 'components/H2'
import H3 from 'components/H3'
import Modal from 'components/Modal'
import Img from 'components/Img'

import messages from './messages'
import {
  AvatarWrapper,
  ListWrapper
} from './styled'

const DetailsModal = ({ selectedUser, getFullName, ...props }) => (
  <Modal {...props}>
    <div>
      <H2> <FormattedMessage {...messages.detailHeader} /> </H2>
      <AvatarWrapper>
        <Img alt={getFullName(selectedUser)} src={selectedUser.getIn(['picture', 'large']) || AvatarDefault} />
      </AvatarWrapper>
      <ListWrapper>
        <li>
          <strong>
            <FormattedMessage {...messages.detailName} />
          </strong>
          { getFullName(selectedUser) }
        </li>
        <li>
          <strong>
            <FormattedMessage {...messages.detailEmail} />
          </strong>
          <A href={`mailTo:${selectedUser.get('email')}`}> { `${selectedUser.get('email')}` } </A>
        </li>
        <li>
          <strong>
            <FormattedMessage {...messages.detailContact} />
          </strong> { `${selectedUser.get('phone')}` }
        </li>
      </ListWrapper>
      <H3> <FormattedMessage {...messages.detailAddressHeader} /> </H3>
      <ListWrapper>
        <li>
          <strong>
            <FormattedMessage {...messages.detailAddressStreet} />
          </strong>
          { `${selectedUser.getIn(['location', 'street'])}` }
        </li>
        <li>
          <strong>
            <FormattedMessage {...messages.detailAddressCity} />
          </strong>
          { `${selectedUser.getIn(['location', 'city'])}` }
        </li>
        <li>
          <strong>
            <FormattedMessage {...messages.detailAddressState} />
          </strong>
          { `${selectedUser.getIn(['location', 'state'])}` }
        </li>
        <li>
          <strong>
            <FormattedMessage {...messages.detailAddressPostcode} />
          </strong>
          { `${selectedUser.getIn(['location', 'postcode'])}` }
        </li>
      </ListWrapper>
    </div>
  </Modal>
)

DetailsModal.propTypes = {
  selectedUser: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  getFullName: PropTypes.func.isRequired
}

export default DetailsModal
