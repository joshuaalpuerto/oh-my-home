import styled from 'styled-components'

import buttonStyles from './buttonStyles'

const StyledButton = styled.button`
  ${buttonStyles}

  &:disabled {
    border: 2px solid #CCC;
    color: #CCD;
  }
`

export default StyledButton
