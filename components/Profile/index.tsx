import styled from "styled-components";
import WrapperContainer from "@/shared/WrapperContainer";
import React, {useState} from "react";
import {useTranslation} from "next-i18next";

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
    return (
        <Container>
            <Section>
                <Header heading="Profile" id='M-0000001'/>
                <FormGroup>
                    <Form>
                        <Legend>Balance</Legend>
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
                        <Legend>Personal Info</Legend>
                        <Input
                            id="email"
                            title="E-Mail"
                            value="current@email.com"
                            onChange={() => {
                            }}
                        />
                        <Button>Change</Button>
                    </Form>
                    <Form>
                        <Legend>Payment</Legend>
                        <Input
                            id="wallet"
                            title="Wallet"
                            value="0xCE5465CA1d1456B6a35aC341B13af8aFA2CcFD2E"
                            onChange={() => {
                            }}
                        />
                        <Button>Change</Button>
                    </Form>
                    <Form>
                        <Legend>Widget personalization</Legend>
                        <Input
                            id="company_name"
                            title="Name of your company"
                            value="ASSETUX"
                            onChange={() => {
                            }}
                        />
                        <FileLoadInput
                            title="Logo"
                            id="logo"
                            selectedFile=""
                            onChange={()=>{}}
                        />
                        <FileLoadInput
                            title="Background"
                            id="background"
                            selectedFile=""
                            onChange={()=>{}}
                        />
                        <Button>Change</Button>
                    </Form>
                </FormGroup>
            </Section>
        </Container>
    )
}


export default ProfileContainer;
