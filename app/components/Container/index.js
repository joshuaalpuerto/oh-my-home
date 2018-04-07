/**
*
* Container
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: calc(1024px + 16px * 2);
  margin: 0 auto;

  @media (max-width: 764px) {
    width: 100%;
  }
`

function Container ({ children, className }) {
  return (
    <Wrapper className={className}>
      { children }
    </Wrapper>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ]).isRequired
}

export default Container
