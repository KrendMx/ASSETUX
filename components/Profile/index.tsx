import styled from "styled-components";
import React from "react";
import {useTranslation} from "next-i18next";

import WrapperContainer from "@/shared/WrapperContainer";
import {Form, Input, Button, Legend, CurrencyInput, FileLoadInput} from "@/components/Profile/FormGroup";
import Header from "./Header";

const Container = styled(WrapperContainer)`
  display: grid;
`

const Section = styled.section``

const FormGroup = styled.div`
  max-width: 574px;
  display: grid;
  row-gap: 40px;
`

function ProfileContainer() {
    const {t} = useTranslation("profile")

    return (
        <Container>
            <Section>
                <Header heading={t("profile")} id="M-0000001"/>
                <FormGroup>
                    <Form>
                        <Legend>{t("balance")}</Legend>
                        <CurrencyInput
                            value={"1528540.00"}
                            currency="BUSD"
                            Icon={<img src="https://bscscan.com/token/images/busd_32.png" alt=""/>}
                            onChange={() => {
                            }}
                        />
                        <CurrencyInput
                            value={"1528540.00"}
                            currency="RUB"
                            Icon={"₽"}
                            onChange={() => {
                            }}
                        />
                    </Form>
                    <Form>
                        <Legend>{t("personalInfo")}</Legend>
                        <Input
                            id="email"
                            title="E-Mail"
                            value="current@email.com"
                            onChange={() => {
                            }}
                        />
                        <Button>{t("change")}</Button>
                    </Form>
                    <Form>
                        <Legend>{t("payment")}</Legend>
                        <Input
                            id="wallet"
                            title={t("wallet")}
                            value="0xCE5465CA1d1456B6a35aC341B13af8aFA2CcFD2E"
                            onChange={() => {
                            }}
                        />
                        <Button>{t("change")}</Button>
                    </Form>
                    <Form>
                        <Legend>{t("widgetPersonalization")}</Legend>
                        <Input
                            id="company_name"
                            title={t("nameYourCompany")}
                            value="ASSETUX"
                            onChange={() => {
                            }}
                        />
                        <FileLoadInput
                            title={t("logo")}
                            id="logo"
                            selectedFile=""
                            onChange={() => {
                            }}
                        />
                        <FileLoadInput
                            title={t("background")}
                            id="background"
                            selectedFile=""
                            onChange={() => {
                            }}
                        />
                        <Button>{t("change")}</Button>
                    </Form>
                </FormGroup>
            </Section>
        </Container>
    )
}


export default ProfileContainer;
