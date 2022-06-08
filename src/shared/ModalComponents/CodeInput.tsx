import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1rem;

  @media only screen and (max-width: 400px) {
    font-size: 3.608vw;
  }
`

const InputBlock = styled.input`
  flex: 0 0 2.07em;
  height: 2.28em;
  width: 0;
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  background: var(--white);
  outline: none;
  opacity: 1;
  text-align: center;
  font-size: 1.5em;
`

type CodeInputProps = {
  nBlocks?: number
  onChange?: (code: string) => void
  onEnterPress?: () => void
}

function CodeInput({ nBlocks = 6, onChange, onEnterPress }: CodeInputProps) {
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

      onChange && onChange(copyValues.join(""))
    }
  }

  const handleKeyDown = (order: number) => {
    return (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key == "Enter" && order == nBlocks - 1) {
        onEnterPress && onEnterPress()
      }

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

  const handlePaste = (order: number) => {
    return (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (order != 0) {
        return
      }

      const copyValue = event.clipboardData.getData("text")

      if (!isNaN(Number(copyValue)) && copyValue.length == nBlocks) {
        setValues(copyValue.split(""))
        inputRefs.current[nBlocks - 1]?.focus()
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
          onPaste={handlePaste(index)}
          maxLength={1}
          autoComplete="off"
          inputMode="decimal"
        />
      ))}
    </Container>
  )
}

export default CodeInput
