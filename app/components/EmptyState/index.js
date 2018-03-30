/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Img from 'components/Img'
import Empty from 'images/shared/empty-list.svg'

const StateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`
function EmptyState ({ message }) {
  return (
    <StateWrapper>
      <Img alt='empty' src={Empty} />
      { message }
    </StateWrapper>
  )
}

// We require the use of src and alt, only enforced by react in dev mode
EmptyState.propTypes = {
  message: PropTypes.string.isRequired
}

export default EmptyState
