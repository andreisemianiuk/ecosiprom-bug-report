import { useState, useLayoutEffect, useCallback } from "react";
const useScreenWidth = () => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = useCallback(() => {
    const windowWidth = hasWindow ? window.innerWidth : null;

    return windowWidth;
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useLayoutEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [getWindowDimensions, hasWindow]);

  return windowDimensions;
};

export default useScreenWidth;
