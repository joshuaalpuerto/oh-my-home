/**
*
* Container
*
*/

import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const Wrapper = styled.div`
  padding :0 20px;
`

function Container({ children, className }) {
  return (
    <Wrapper className={className}>
      { children }
    </Wrapper>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default Container;
