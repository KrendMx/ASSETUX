import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useReducer,
  useCallback
} from 'react'
import Cookies from 'js-cookie'

import {
  mobile,
  mappedCookies,
  mobileLayoutForTablet,
  tablet
} from './data/constants'

import type { RefObject, EffectCallback } from 'react'
import {
  setAppLoaded,
  setBurgerActive,
  setDesktop,
  setMobile,
  setMobileLayoutForTablet,
  setTablet
} from './redux/ui'
import { checkCurrency } from './data/currencies'
import { useAppDispatch } from './redux/hooks'
import { useRouter } from 'next/router'

export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

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

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
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

    window.addEventListener('click', handleClick, true)

    return () => {
      window.removeEventListener('click', handleClick, true)
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

export const useSliderConfig = () => {
  const toShow = 3
  const gap = 19
  const vertPadding = 19
  const horizPadding = 0

  const responsive = [
    {
      resolution: mobileLayoutForTablet,
      toShow: 2,
      gap: 19
    },
    {
      resolution: mobile,
      toShow: 1,
      gap: 15
    }
  ]

  return {
    gap,
    toShow,
    vertPadding,
    horizPadding,
    responsive
  }
}

export const useAppMount = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const isCommercePayment =
    router.pathname == '/payment/[id]' ||
    router.pathname == '/payment_listing/[token]'

  useEffect(() => {
    if (!router.locale) {
      return
    }

    Cookies.set('NEXT_LOCALE', router.locale)
  }, [router.locale])

  useMount(() => {
    const closeMenus = () => {
      dispatch(setBurgerActive(false))
    }

    const handleRouteChange = () => {
      console.log('[App] Route change')
    }

    const handleRouteComplete = () => {
      console.log('[App] Route change complete')
      closeMenus()
    }

    const handleRouteError = () => {
      console.log('[App] Route change error')
      closeMenus()
    }

    const handleResize = () => {
      if (window.innerWidth <= mobile) {
        dispatch(setMobile())
      } else if (window.innerWidth <= mobileLayoutForTablet) {
        dispatch(setMobileLayoutForTablet())
        dispatch(setBurgerActive(false))
      } else if (window.innerWidth <= tablet) {
        dispatch(setTablet())
        dispatch(setBurgerActive(false))
      } else {
        dispatch(setDesktop())
        dispatch(setBurgerActive(false))
      }
    }

    const handleOnLoad = () => {
      console.log('[App] Page loaded')
      dispatch(setAppLoaded())
    }

    const alreadyLoaded = document.readyState == 'complete'

    if (alreadyLoaded) {
      handleOnLoad()
    } else {
      window.onload = handleOnLoad
    }

    window.addEventListener('resize', handleResize)

    handleResize()
    checkCurrency(dispatch)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    router.events.on('routeChangeError', handleRouteError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
      router.events.off('routeChangeError', handleRouteError)
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return { isCommercePayment, router }
}
