import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer,
  useCallback
} from "react"
import Cookies from "js-cookie"

import { mobile, mappedCookies } from "./constants"

import type { RefObject, EffectCallback } from "react"

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

export const useToggle = (initialValue = false) =>
  useReducer((toggled) => !toggled, initialValue)

export const useClickOutside = (ref: RefObject<Node>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        callback()
      }
    }

    window.addEventListener("click", handleClick, true)

    return () => {
      window.removeEventListener("click", handleClick, true)
    }
    // callback is a function so on every render it'll be recreated and useEffect will be called again
    // for sake of optimization you can wrap outer callback in useCallback
  }, [ref, callback])
}

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useAuthorized = () =>
  useCallback(() => {
    const token = Cookies.get(mappedCookies.authToken)

    return token ? token : null
  }, [])

export const useMount = (effect: EffectCallback) => {
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current) {
      return
    }

    handled.current = true

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
