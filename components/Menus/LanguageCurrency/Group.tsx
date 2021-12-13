import React, { useState } from "react"
import NavButton from "../NavButton"

type NavGroupProps = {
  title: string
  children: JSX.Element
}

function NavGroup({ title, children }: NavGroupProps) {
  const [active, setActive] = useState(true)

  return (
    <>
      <NavButton
        active={active}
        title={title}
        onClick={() => setActive(!active)}
      />
      {active && children}
    </>
  )
}

export default NavGroup
