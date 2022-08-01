import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { HiOutlineArrowUp } from "react-icons/hi"

const offsetY = window.innerHeight

const Button = styled.button`
  z-index: 9999;
  position: fixed;
  bottom: 18px;
  left: 18px;
  width: 49px;
  height: 49px;
  cursor: pointer;
  background: var(--blue);
  outline: none;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 22px;
    color: #ffffff;
  }
`

const ScrollButton: React.FC = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setActive(window.scrollY >= offsetY)
    }

    const handleScroll = () => {
      setActive(window.scrollY >= offsetY)
    }

    checkScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!active) {
    return null
  }

  return (
    <Button
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      }}
    >
      <HiOutlineArrowUp />
    </Button>
  )
}

export default ScrollButton