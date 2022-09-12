import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  return isDesktop ? children : null;
};
export const Laptop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992, maxWidth: 1223 });
  return isDesktop ? children : null;
};
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
export const TabletOrLaptop = ({ children }) => {
  const isTabletOrLaptop = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  return isTabletOrLaptop ? children : null;
};
export const DesktopOrLaptop = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  return isDesktopOrLaptop ? children : null;
};
export const TabletOrMobile = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });
  return isTabletOrMobile ? children : null;
};
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
export const NotMobile = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};
export const Default = ({ children }) => {
  const isNotDesktop = useMediaQuery({ maxWidth: 1223 });
  return isNotDesktop ? children : null;
};
