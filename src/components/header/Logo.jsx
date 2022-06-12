import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
// import { useMediaQueryHook } from "../common/MediaQuery/useMediaQueryHook"

const LogoItem = styled.div`
  width: ${({ width }) => `${width}px`};
`

export const Logo = () => {
  // const device = useMediaQueryHook()
  // const deviceWidth =
  //   (device === "mobileS" && 250) ||
  //   (device === "mobileM" && 275) ||
  //   (device === "mobileL" && 300) ||
  //   (device === "tablet" && 300) ||
  //   (device === "laptop" && 200) ||
  //   (device === "laptopL" && 230) ||
  //   (device === "desktop" && 250) ||
  //   350
  return (
    <LogoItem width={170}>
      <StaticImage
        src="../images/logo-ecosiprom.png"
        alt="Logo for site"
        placeholder="blurred"
        layout="constrained"
      />
    </LogoItem>
  )
}
