/**
*
* Modal
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'

import Button from 'components/Button'

import messages from './messages'
import {
  ModalContainer,
  ModalWrapper,
  ModalContent,
  ModalFooter
} from './styled'

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    open: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired
  }

  render () {
    const { children, open, handleToggle } = this.props
    return (
      <ModalContainer open={open}>
        <ModalWrapper>
          <ModalContent>
            { children }
          </ModalContent>
          <ModalFooter>
            <Button handleRoute={handleToggle}>
              <FormattedMessage {...messages.closeButton} />
            </Button>
          </ModalFooter>
        </ModalWrapper>
      </ModalContainer>
    )
  }
}

export default Modal
