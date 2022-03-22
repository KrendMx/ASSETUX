import styled from "styled-components";
import WrapperContainer from "@/shared/WrapperContainer";
import React, {useState} from "react";
import {useTranslation} from "next-i18next";

import {Form, Input, Button, Legend, CurrencyInput} from "@/components/Profile/FormGroup";
import Header from "./Header";

const Container = styled(WrapperContainer)`
  display: grid;
`

const Section = styled.section``

const FormGroup = styled.div`
    max-width: 574px;
`


function ProfileContainer() {
    return (
        <Container>
            <Section>
                <Header heading="Profile" id='M-0000001'/>
                <FormGroup>
                    <Form gap="15px">
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
                </FormGroup>
            </Section>
        </Container>
    )
}


export default ProfileContainer;
