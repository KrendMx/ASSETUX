import React, { useState, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Image from 'next/image'
import SearchIcon from '../../../../../public/assets/Search.svg'
import { mobile, optimizeRemoteImages } from '@/lib/data/constants'

import type { Option } from '../types.input-select'

type ItemProps = {
  selectable?: boolean
}

const Item = styled.div<ItemProps>`
  background: var(--white);
  width: 100%;
  height: 3.421em;
  padding: 0 1.052em;
  border: 1px solid #d2d2d7;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: ${(props) => (props.selectable ? 'pointer' : 'default')};

  & > * + * {
    margin-left: 19px;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: 4.334em;
  }

  @media only screen and (max-width: 370px) {
    border-radius: 0.675em;

    & > * + * {
      margin-left: 10px;
    }
  }
`

const Label = styled.h5`
  font-weight: 500;
  font-size: 0.8em;
  text-align: center;
  color: var(--gray);
  margin: 0;
  margin-top: 23px;

  @media only screen and (max-width: ${mobile}px) {
    font-size: 0.87em;
    margin-top: -2px;
    margin-bottom: 11px !important;
  }

  @media only screen and (max-width: 370px) {
    font-size: 3.5vw;
  }
`

const NoResultsLabel = styled(Label)`
  margin: 0;
  margin-top: 40px;

  @media only screen and (max-width: ${mobile}px) {
    margin-top: 32px;
  }
`

const ItemValue = styled.span`
  font-size: 1em;
  color: var(--gray);

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

const Shadow = styled.div`
  flex-shrink: 0;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bgColor);
  border-radius: 10px;
  overflow: hidden;
  color: var(--gray);

  @media only screen and (max-width: 370px) {
    width: 30px;
    height: 30px;
  }
`

const ImageContainer = styled.div`
  width: 24px;
  height: 24px;

  @media only screen and (max-width: 370px) {
    width: 14px;
    height: 14px;
  }
`

const SearchIconContainer = styled.div`
  width: 30px;
  height: 30px;

  @media only screen and (max-width: 370px) {
    width: 20px;
    height: 20px;
  }
`

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1em;
  color: var(--gray);
  background: var(--white);

  &::placeholder {
    color: var(--gray);
    opacity: 1;
  }

  @media only screen and (max-width: ${mobile}px) {
    font-size: 1.067em;
  }
`

type ScrollableRegionProps = {
  display: number
}

const ScrollableRegion = styled.div<ScrollableRegionProps>`
  height: ${(props) => props.display * 3.421 + (props.display - 1) * 0.842}em;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > *:not(:last-child) {
    margin-bottom: 0.842em;
  }

  @media only screen and (max-width: ${mobile}px) {
    height: ${(props) => props.display * 4.334 + (props.display - 1) * 0.842}em;
  }
`

type SearchProps = {
  options: Option[]
  onSelect: (selectedValue: string) => void
  display: number
  label?: string
  hide: boolean
}

const Select = ({ options, onSelect, display, label, hide }: SearchProps) => {
  const { t } = useTranslation('inputSelect')

  const [searchContext, setSearchContext] = useState('')
  const searchedOptions = useMemo(() => {
    const lowerCasedCtx = searchContext.toLowerCase()

    return options.filter((option) => {
      let valuesToCheck = option.value.toLowerCase().split(' ')

      if (option.description) {
        valuesToCheck = valuesToCheck.concat(
          option.description.toLowerCase().split(' ')
        )
      }

      let good = false

      for (const value of valuesToCheck) {
        const result = value.startsWith(lowerCasedCtx)

        if (result) {
          good = true
          break
        }
      }

      return good
    })
  }, [searchContext, options])

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setSearchContext(value)
  }

  if (hide) {
    return null
  }

  return (
    <>
      {label && <Label>{label}</Label>}
      <Item>
        <Shadow>
          <SearchIconContainer>
            <Image
              src={SearchIcon}
              width={30}
              height={30}
              layout="responsive"
              alt="Logo"
              unoptimized={!optimizeRemoteImages}
            />
          </SearchIconContainer>
        </Shadow>
        <Input
          type="text"
          placeholder={t('placeholder')}
          value={searchContext}
          onChange={handleInput}
        />
      </Item>

      {searchedOptions.length > 0 ? (
        <ScrollableRegion display={display}>
          {searchedOptions.map((option) => (
            <Item
              key={option.value}
              onClick={() => {
                onSelect(option.value)
                setSearchContext('')
              }}
              selectable
            >
              {option.icon ? (
                <Shadow>
                  <ImageContainer>
                    <Image
                      src={option.icon}
                      width={24}
                      height={24}
                      layout="responsive"
                      alt="Logo"
                      unoptimized={!optimizeRemoteImages}
                    />
                  </ImageContainer>
                </Shadow>
              ) : option?.shortDescription?.split(' ')[1] ? (
                <Shadow>{option?.shortDescription?.split(' ')[1]}</Shadow>
              ) : (
                <Shadow />
              )}
              <ItemValue>{option.description}</ItemValue>
            </Item>
          ))}
        </ScrollableRegion>
      ) : (
        <NoResultsLabel>{t('noResult')}</NoResultsLabel>
      )}
    </>
  )
}

export default Select
