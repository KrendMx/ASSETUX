import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1rem;
`

const InputBlock = styled.input`
  flex: 0 0 59px;
  height: 65px;
  width: 0;
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  background: var(--white);
  outline: none;
  opacity: 1;
  text-align: center;
  font-size: 1.5em;

  @media only screen and (max-width: 450px) {
    flex: 0 1 42px;
    height: 45px;
  }
`

type CodeInputProps = {
  nBlocks?: number
  onFilled?: (code: string) => void
}

function CodeInput({ nBlocks = 6, onFilled }: CodeInputProps) {
  const [values, setValues] = useState<string[]>(new Array(nBlocks).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (order: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const copyValues = [...values]

      const value = event.target.value

      if (value == "" || !isNaN(parseInt(value))) {
        copyValues[order] = value

        if (value != "") {
          inputRefs.current[order + 1]?.focus()
        }
      }

      setValues(copyValues)

      if (order == nBlocks - 1) {
        onFilled && onFilled(copyValues.join(""))
      }
    }
  }

  const handleKeyDown = (order: number) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key == "Backspace" && values[order] == "") {
        event.preventDefault()

        inputRefs.current[order - 1]?.focus()

        return
      }

      if (
        !isNaN(parseInt(event.key)) &&
        values[order] != "" &&
        order != nBlocks - 1
      ) {
        const copyValues = [...values]
        copyValues[order + 1] = event.key

        inputRefs.current[order + 1]?.focus()

        setValues(copyValues)
      }
    }
  }

  return (
    <Container>
      {Array.from({ length: nBlocks }).map((_, index) => (
        <InputBlock
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={values[index]}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          maxLength={1}
          autoComplete="off"
        />
      ))}
    </Container>
  )
}

export default CodeInput
