import React from "react"
import styled from "styled-components"
import { VictoryLine } from "victory"
import { memo } from "react"

const Container = styled.div`
  width: 145px;
  height: 35px;
`

type GraphData = {
  x: number
  y: number
}

const data: GraphData[] = [
  { x: 0, y: 1200 },
  { x: 1, y: 700 },
  { x: 2, y: 600 },
  { x: 3, y: 800 },
  { x: 4, y: 1000 },
  { x: 5, y: 800 },
  { x: 6, y: 1200 },
  { x: 7, y: 400 },
  { x: 8, y: 200 },
  { x: 9, y: 350 },
  { x: 10, y: 200 }
]

type GraphProps = {
  coords?: GraphData[]
  color: string
}

const Graph = ({ coords = data, color = "var(--gray)" }: GraphProps) => {
  return (
    <Container>
      <VictoryLine
        width={145}
        height={35}
        padding={0}
        style={{ data: { stroke: color, strokeWidth: 2 } }}
        domainPadding={{ y: 5 }}
        interpolation="natural"
        data={coords}
      />
    </Container>
  )
}

export default memo(Graph)
