import React, { useEffect, useState } from 'react'
import { HiOutlineArrowUp } from 'react-icons/hi'
import { Button } from './style'

const offsetY = window.innerHeight

const ScrollButton = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setActive(window.scrollY >= offsetY)
    }

    const handleScroll = () => {
      setActive(window.scrollY >= offsetY)
    }

    checkScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!active) {
    return null
  }

  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }}
    >
      <HiOutlineArrowUp />
    </Button>
  )
}

export default ScrollButton
