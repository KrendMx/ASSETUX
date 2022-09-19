import React, { useState, useRef, useMemo, useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"

import {
  Form,
  Button,
  FormHeading,
  Balance,
  Paragraph
} from "../common/form-components"
import InputSelect from "@/components/common/input-select"
import AdaptiveFont from "@/components/common/adaptive-font"
import Image from "next/image"
import Icon from "@/components/common/modal-components/Icon"
import Shadow from "@/components/common/modal-components/Shadow"

import { mobile, tablet, walletRegexp } from "@/lib/data/constants"
import { EcommerceClient } from "@/lib/backend/clients"
import { toBase64, getEcommercePrefix } from "@/lib/utils/helpers"
import { useAuthorized } from "@/lib/hooks"

import type { IMerchant, UserImage } from "@/lib/backend/ecommerce/types"
import type { RequestState } from "@/core/backend/types"
import { setMerchantMode } from "@/lib/redux/ui"
import { useAppDispatch } from "@/lib/redux/hooks"
import CryptoManager from "@/components/common/crypto-manager"
import SupportPopup from "./support-popup"
import styles from "./popup.module.css"
import OutIcon from "../../../../public/assets/Out.svg"

const Container = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  width: 100%;
  max-width: 574px;
  display: grid;
  row-gap: 2.1em;

  @media only screen and (max-width: ${mobile}px) {
    gap: 1.466em;
  }
`

const Flex = styled(AdaptiveFont).attrs({
  mobileFactor: 1.3335,
  tabletFactor: 1.25
})`
  /* max-width: 574px; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;

  @media only screen and (max-width: ${tablet}px) {
    flex-direction: column-reverse;
  }
`

const Label = styled(Paragraph)`
  margin-top: 16px;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 20px;
  word-break: break-all;
`

const inputId = {
  wallet: "wallet",
  email: "email",
  companyName: "companyName",
  companyLogo: "companyLogo",
  companyBackground: "companyBackground"
} as const

type Widgets = "wallet" | "company"

type Option = {
  icon?: string
  shortDescription?: string
  description?: string
  value: string
  chain_id?: number
}

export type FormGroupProps = IMerchant

function FormGroup(props: FormGroupProps) {
  const {
    user: { userId, email, public_key, balance, mode },
    tokens,
    widget: { nameCompany, logoCompanyName, backgroundCompanyName }
  } = props
  const { t } = useTranslation("profile")
  const router = useRouter()
  const isTRANSFER = mode == "TRANSFER"
  const isCONNECT = mode == "CONNECT"

  const checkAuthorized = useAuthorized()

  const [wallet, setWallet] = useState(public_key)
  const [company, setCompany] = useState(nameCompany == null ? "" : nameCompany)
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
  const prevCompany = useRef(nameCompany == null ? "" : nameCompany)
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
        [inputId.wallet]: t("walletError")
      }))

      return
    }

    setInputError((prev) => ({
      ...prev,
      [inputId.wallet]: undefined
    }))

    setRequests((prev) => ({
      ...prev,
      wallet: { state: "pending" }
    }))

    const token = checkAuthorized()

    if (!token) {
      router.push(`${getEcommercePrefix()}/login`)

      return
    }

    const response = await EcommerceClient.changeWallet({ wallet, token })

    if (response.state != "success") {
      if (
        response.state == "error" &&
        response.data.message == "Wallet is not valid"
      ) {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t("walletError")
        }))
      } else if (
        response.state == "error" &&
        response.data.message == "The wallet must be unique"
      ) {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t("walletUnique")
        }))
      } else {
        setInputError((prev) => ({
          ...prev,
          [inputId.wallet]: t("smthHappened")
        }))
      }

      setRequests((prev) => ({
        ...prev,
        wallet: { state: "error", error: null }
      }))

      return
    }

    prevPublicKey.current = wallet

    setRequests((prev) => ({
      ...prev,
      wallet: { state: "success", result: null }
    }))
  }

  const handleWidgetSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()

    setRequests((prev) => ({
      ...prev,
      company: { state: "pending" }
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

    if (response.state == "success") {
      setRequests((prev) => ({
        ...prev,
        company: { state: "success", result: null }
      }))

      prevCompany.current = company
      prevLogo.current = logo.name
      prevBackground.current = background.name
    } else {
      setRequests((prev) => ({
        ...prev,
        company: { state: "error", error: null }
      }))
    }
  }

  const handleSetWallet: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value

    setWallet(value)

    if (requests.wallet?.state == "error") {
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

    if (requests.company?.state == "error") {
      setRequests((prev) => ({
        ...prev,
        company: null
      }))
    }
  }

  const handleFile =
    (image: "companyLogo" | "companyBackground") => async (file: File) => {
      const validTypes = ["image/png", "image/jpeg"]

      const setError = (error?: string) =>
        setInputError((prev) => ({
          ...prev,
          [image]: error
        }))

      if (!validTypes.includes(file.type)) {
        setError(t("invalidImage"))

        return
      }

      try {
        const base64 = await toBase64(file)
        const name = file.name

        setError()
        setUpdatedWidget(true)

        if (requests.company?.state == "error") {
          setRequests((prev) => ({
            ...prev,
            company: null
          }))
        }

        if (image == "companyLogo") {
          setLogo({ img: base64, name })
        } else {
          setBackground({ img: base64, name })
        }
      } catch (_) {
        setError(t("invalidImage"))
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

  return (
    <Flex>
      <CryptoManager />
      <Container>
        <Form as="section">
          <FormHeading>{t("balance")}</FormHeading>
          {/* {!!balance ? ( */}
          <div
            style={{
              display: "flex",
              gap: 17
            }}
          >
            <Balance
              amount={balance ? parseFloat((+balance).toFixed(2)) + "" : "0.00"}
              icon="₽"
              symbol="RUB"
              fiat
              style={{ width: "100%" }}
            />
            <button
              className={styles.copyButton}
              onClick={() => setSupportOpen(true)}
            >
              <Shadow>
                <Icon>
                  <Image
                    src={OutIcon}
                    layout="fill"
                    alt="copy"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </Icon>
              </Shadow>
            </button>
          </div>
          {/* ) : (
            <Paragraph>{t("assets")}</Paragraph>
          )} */}
        </Form>
        <Form as="section">
          <FormHeading>{t("personalInfo")}</FormHeading>
          <InputSelect
            id={inputId.email}
            label="E-Mail"
            autocomplete="email"
            value={email}
            selectable={false}
          />
        </Form>
        {!isCONNECT && (
          <>
            <Form onSubmit={handlePaymentSubmit}>
              <FormHeading>{t("payment")}</FormHeading>
              <InputSelect
                id={inputId.wallet}
                label={t("wallet")}
                selectable={false}
                onChange={handleSetWallet}
                value={wallet}
                error={inputError[inputId.wallet]}
                changeable
              />
              <Button
                type="submit"
                isLoading={requests.wallet?.state == "pending"}
                disabled={
                  wallet == prevPublicKey.current ||
                  (requests.wallet != null &&
                    requests.wallet.state != "success") ||
                  inputError[inputId.wallet] != undefined
                }
              >
                {requests.wallet?.state == "pending"
                  ? t("loading")
                  : t("change")}
              </Button>
            </Form>
            <Form onSubmit={handleWidgetSubmit}>
              <FormHeading>{t("widgetPersonalization")}</FormHeading>
              <InputSelect
                id={inputId.companyName}
                error={
                  requests.company?.state == "error"
                    ? t("smthHappened")
                    : undefined
                }
                label={t("nameYourCompany")}
                value={company}
                onChange={handleSetCompany}
                selectable={false}
                changeable
              />
              <InputSelect
                id={inputId.companyLogo}
                error={
                  requests.company?.state == "error"
                    ? t("smthHappened")
                    : inputError[inputId.companyLogo]
                }
                label={t("logo")}
                onUpload={handleFile(inputId.companyLogo)}
                fileLabel={t("upload")}
                accept=".png,.jpg,.jpeg"
                selectable={false}
                uploadedFileName={logo.name ? logo.name : undefined}
                changeable
                file
              />
              <InputSelect
                id={inputId.companyBackground}
                error={
                  requests.company?.state == "error"
                    ? t("smthHappened")
                    : inputError[inputId.companyBackground]
                }
                label={t("background")}
                onUpload={handleFile(inputId.companyBackground)}
                fileLabel={t("upload")}
                accept=".png,.jpg,.jpeg"
                selectable={false}
                uploadedFileName={background.name ? background.name : undefined}
                changeable
                file
              />
              <Button
                type="submit"
                isLoading={requests.company?.state == "pending"}
                disabled={
                  !updatedWidget ||
                  (company == prevCompany.current &&
                    logo.name == prevLogo.current &&
                    background.name == prevBackground.current) ||
                  inputError[inputId.companyLogo] != undefined ||
                  inputError[inputId.companyBackground] != undefined ||
                  (requests.company != null &&
                    requests.company.state != "success")
                }
              >
                {requests.company?.state == "pending"
                  ? t("loading")
                  : t("change")}
              </Button>
            </Form>
          </>
        )}
      </Container>
      {isTRANSFER && !!tokens?.length && (
        <Container>
          <Form as="section">
            <FormHeading>{t("token")}</FormHeading>
            <InputSelect
              label={t("home:buy_blockchain")}
              id={"blockchains"}
              selectLabel={t("home:buy_blockchainLabel")}
              options={avaliableChains}
              displayInSelect={2}
              onActiveChange={(active) => {}}
              onSelect={onBlockchainChange}
              selectedValue={selectedChain?.value}
              selectable={!!avaliableChains && avaliableChains.length > 1}
              displayIcon
            />
            <Label>
              {!!selectedToken?.address ? selectedToken.address : ""}
            </Label>
          </Form>
        </Container>
      )}
      {supportOpen && (
        <SupportPopup userId={userId} email={email} setOpen={setSupportOpen} />
      )}
    </Flex>
  )
}

export default FormGroup
