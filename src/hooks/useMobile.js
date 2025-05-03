// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
/**
 * Function that returns a boolean value indicating if the screen is mobile or not.
 * It is dynamically updated when the screen is resized.
 * It is updated at the start or when the breakpoint is reached.
 * @param {number} mobileSize - The breakpoint to determine if the screen is mobile or not.
 * The mobileSize number is not included in the mobile screen.
 * It is always the mobileSize - 1.
 */
export const useMobile = (mobileSize = 660) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth < mobileSize)
    }
    checkBreakpoint(window.innerWidth < mobileSize)
    const desktopMediaQuery = window.matchMedia(`(min-width: ${mobileSize}px)`)
    desktopMediaQuery.addEventListener('change', checkBreakpoint)
    return () => {
      desktopMediaQuery.removeEventListener('change', checkBreakpoint)
    }
  }, [mobileSize])
  return { isMobile }
}
