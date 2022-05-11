import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { mobile } from "./constants"

export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useImmediateMobile = (customWidth?: number) => {
  const [isMobile, setIsMobile] = useState(false)

  const widthToCheck = customWidth ? customWidth : mobile

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= widthToCheck)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [widthToCheck])

  return isMobile
}
