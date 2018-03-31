/**
*
* Modal
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

import Button from 'components/Button'

import messages from './messages'

const ModalContainer = styled.div`
  background:rgba(0,0,0,.8);
  display: ${(({ open }) => open ? 'flex' : 'none')};
  height:100%;
  justify-content: center;
  left:0;
  position:fixed;
  top:0;
  width:100%;
  z-index:1;
`
const ModalWrapper = styled.div`
  background-color: #FFF;
  height: auto;
  margin: auto;
  min-width: 300px;
  width: 60%;
`

const ModalContent = styled.div`
  border-radius:3px;
  display:inline-block;
  font-weight:300;
  min-height: 100%;
  padding:20px;
  position:relative;
  width: 100%;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

class Modal extends React.Component {
  static propTypes = {
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
