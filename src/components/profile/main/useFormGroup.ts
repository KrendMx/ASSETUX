import React, { useState, useRef, useMemo, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { walletRegexp } from '@/lib/data/constants'
import { EcommerceClient } from '@/lib/backend/clients'
import { toBase64, getEcommercePrefix } from '@/lib/utils/helpers.utils'
import { useAuthorized } from '@/lib/hooks'

import type { UserImage } from '@/lib/backend/ecommerce/types.backend.ecommerce'
import type { RequestState } from '@/core/backend/types.core.backend'
import { setMerchantMode } from '@/lib/redux/ui'
import { useAppDispatch } from '@/lib/redux/hooks'
import {
  FormGroupProps,
  Widgets,
  Option,
  inputId,
  ImageString
} from './types.main'

const useFormGroup = (props: FormGroupProps) => {
  const {
    user: { userId, email, public_key, balance, mode },
    tokens,
    widget: { nameCompany, logoCompanyName, backgroundCompanyName }
  } = props
  const { t } = useTranslation('profile')
  const router = useRouter()
  const isTRANSFER = mode == 'TRANSFER'
  const isCONNECT = mode == 'CONNECT'

  const checkAuthorized = useAuthorized()

  const [wallet, setWallet] = useState(public_key)
  const [company, setCompany] = useState(nameCompany == null ? '' : nameCompany)
  const [logo, setLogo] = useState({
    name: logoCompanyName,
    img: null as string | null
  })
  const [background, setBackground] = useState({
    name: backgroundCompanyName,
    img: null as string | null
  })
  const [inputError, setInputError] = useState<
    Record<string, string | undefined>
  >({})
  const [requests, setRequests] = useState<
    Record<Widgets, RequestState | null>
  >({
    wallet: null,
    company: null
  })

  const dispatch = useAppDispatch()
  const [supportOpen, setSupportOpen] = useState(false)
  const [updatedWidget, setUpdatedWidget] = useState(false)
  const [avaliableChains, setAvaliableChains] = useState<Option[] | undefined>()
  const [selectedChain, setSelectedChain] = useState<Option | undefined>()
  const [selectedToken, setSelectedToken] = useState(
    !!tokens?.length ? tokens[0] : undefined
  )

  useEffect(() => {
    dispatch(setMerchantMode(mode))
  }, [dispatch, mode])

  const prevPublicKey = useRef(public_key)
  const prevCompany = useRef(nameCompany == null ? '' : nameCompany)
  const prevLogo = useRef(logoCompanyName)
  const prevBackground = useRef(backgroundCompanyName)

  const handlePaymentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    const valid = walletRegexp.test(wallet)

    if (!valid) {
      setInputError((prev) => ({
        ...prev,
        [inputId.wallet]: t('walletError')
      }))

      return
    }

    setInputError((prev) => ({
      ...prev,
      [inputId.wallet]: undefined
    }))

    setRequests((prev) => ({
      ...prev,
      wallet: { state: 'pending' }
    }))

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)

      return
    }

    const response = await EcommerceClient.changeWallet({ wallet, token })

    if (response.state != 'success') {
      if (
        response.state == 'error' &&
        response.data.message == 'Wallet is not valid'
      ) {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t('walletError')
        }))
      } else if (
        response.state == 'error' &&
        response.data.message == 'The wallet must be unique'
      ) {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t('walletUnique')
        }))
      } else {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t('smthHappened')
        }))
      }

      setRequests((prev) => ({
        ...prev,
        wallet: { state: 'error', error: null }
      }))

      return
    }

    prevPublicKey.current = wallet

    setRequests((prev) => ({
      ...prev,
      wallet: { state: 'success', result: null }
    }))
  }

  const handleWidgetSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    setRequests((prev) => ({
      ...prev,
      company: { state: 'pending' }
    }))

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)

      return
    }

    let nameCompany: string | undefined = undefined
    if (prevCompany.current != company) {
      nameCompany = company
    }

    let logoCompany: UserImage | undefined = undefined
    if (
      logo.name != null &&
      logo.img != null &&
      prevLogo.current != logo.name
    ) {
      logoCompany = { name: logo.name, img: logo.img }
    }

    let backgroundCompany: UserImage | undefined = undefined
    if (
      background.name != null &&
      background.img != null &&
      prevBackground.current != background.name
    ) {
      backgroundCompany = { name: background.name, img: background.img }
    }

    const response = await EcommerceClient.changeCompany({
      nameCompany,
      logoCompany,
      backgroundCompany,
      token
    })

    setUpdatedWidget(false)

    if (response.state == 'success') {
      setRequests((prev) => ({
        ...prev,
        company: { state: 'success', result: null }
      }))

      prevCompany.current = company
      prevLogo.current = logo.name
      prevBackground.current = background.name
    } else {
      setRequests((prev) => ({
        ...prev,
        company: { state: 'error', error: null }
      }))
    }
  }

  const handleSetWallet: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setWallet(value)

    if (requests.wallet?.state == 'error') {
      setRequests((prev) => ({ ...prev, wallet: null }))
    }

    setInputError((prev) => ({
      ...prev,
      [inputId.wallet]: undefined
    }))
  }

  const handleSetCompany: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setCompany(value)
    setUpdatedWidget(true)

    if (requests.company?.state == 'error') {
      setRequests((prev) => ({
        ...prev,
        company: null
      }))
    }
  }

  const handleFile = (image: ImageString) => async (file: File) => {
    const validTypes = ['image/png', 'image/jpeg']

    const setError = (error?: string) =>
      setInputError((prev) => ({
        ...prev,
        [image]: error
      }))

    if (!validTypes.includes(file.type)) {
      setError(t('invalidImage'))

      return
    }

    try {
      const base64 = await toBase64(file)
      const name = file.name

      setError()
      setUpdatedWidget(true)

      if (requests.company?.state == 'error') {
        setRequests((prev) => ({
          ...prev,
          company: null
        }))
      }

      if (image == 'companyLogo') {
        setLogo({ img: base64, name })
      } else {
        setBackground({ img: base64, name })
      }
    } catch (_) {
      setError(t('invalidImage'))
    }
  }

  const onBlockchainChange = (blockchainTitle: string) => {
    const _selectedChain = !!avaliableChains?.length
      ? avaliableChains.filter(
          (blockchain) => blockchain.value === blockchainTitle
        )[0]
      : undefined
    !!tokens?.length &&
      !!_selectedChain &&
      setSelectedToken(
        tokens.filter(({ chain }) => chain.id === _selectedChain.chain_id)[0]
      )
    setSelectedChain(_selectedChain)
  }

  useEffect(() => {
    if (!!tokens?.length) {
      const formatedChains: Option[] = tokens.map(({ chain }) => {
        return {
          value: chain.title,
          description: chain.title,
          icon: chain.logo,
          chain_id: chain.id
        }
      })
      setAvaliableChains(formatedChains)
      setSelectedChain(formatedChains[0])
      setSelectedToken(tokens[0])
    }
  }, [tokens])
  return {
    balance,
    setSupportOpen,
    t,
    email,
    isCONNECT,
    handlePaymentSubmit,
    handleSetWallet,
    wallet,
    inputError,
    requests,
    prevPublicKey,
    handleWidgetSubmit,
    company,
    handleSetCompany,
    handleFile,
    logo,
    background,
    updatedWidget,
    prevCompany,
    prevLogo,
    prevBackground,
    isTRANSFER,
    tokens,
    avaliableChains,
    onBlockchainChange,
    selectedChain,
    selectedToken,
    supportOpen,
    userId
  }
}

export default useFormGroup
