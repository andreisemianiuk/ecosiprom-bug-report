import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { useMediaQueryHook } from '../common/MediaQuery/useMediaQueryHook'

const LogoItem = styled.div`
  width: ${({ width }) => `${width}px`};
`

export const Logo = () => {
  const device = useMediaQueryHook()
  const deviceWidth =
    (device === 'mobileS' && 250) ||
    (device === 'mobileM' && 300) ||
    (device === 'mobileL' && 350) ||
    (device === 'tablet' && 300) ||
    (device === 'laptop' && 200) ||
    (device === 'laptopL' && 250) ||
    (device === 'desktop' && 350) ||
    250
  return (
    <LogoItem width={deviceWidth}>
      <StaticImage
        src='../images/logo-ecosiprom.png'
        alt='Logo for site'
        placeholder='blurred'
        layout='constrained'
      />
    </LogoItem>
  )
}
