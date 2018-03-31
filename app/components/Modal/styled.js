
import styled from 'styled-components'

export const ModalContainer = styled.div`
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
export const ModalWrapper = styled.div`
  background-color: #FFF;
  height: auto;
  margin: auto;
  min-width: 300px;
  width: 60%;
`

export const ModalContent = styled.div`
  border-radius:3px;
  display:inline-block;
  font-weight:300;
  min-height: 100%;
  padding:20px;
  position:relative;
  width: 100%;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`
