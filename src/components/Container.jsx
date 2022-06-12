import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 0 135px;
`

function Container({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  )
}

export default Container
