import { useMediaQuery } from 'react-responsive'
import { devices } from './media-query'

export function useMediaQueryHook() {
  const isMobileS = useMediaQuery({ query: devices.mobileS })
  const isMobileM = useMediaQuery({ query: devices.mobileM })
  const isMobileL = useMediaQuery({ query: devices.mobileL })
  const isTablet = useMediaQuery({ query: devices.tablet })
  const isLaptop = useMediaQuery({ query: devices.laptop })
  const isLaptopL = useMediaQuery({ query: devices.laptopL })
  const isDesktop = useMediaQuery({ query: devices.desktop })
  return (
    (isMobileS && 'mobileS') ||
    (isMobileM && 'mobileM') ||
    (isMobileL && 'mobileL') ||
    (isTablet && 'tablet') ||
    (isLaptop && 'laptop') ||
    (isLaptopL && 'laptopL') ||
    (isDesktop && 'desktop')
  )
}
