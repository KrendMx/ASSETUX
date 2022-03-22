import styled from "styled-components";
import WrapperContainer from "@/shared/WrapperContainer";
import React, {useState} from "react";

import {Form, Input, Button} from "@/components/Profile/FormGroup";
import {useTranslation} from "next-i18next";

const Container = styled(WrapperContainer)`
  display: grid;
`

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.36rem;
`

const Note = styled.p`
  margin-bottom: 1.36rem;
  font-size: .94rem;
`

const Section = styled.section``

const LoginWrapper = styled.div`
  max-width: 469px;
  margin: auto;
`

function LoginContainer() {
    const {t} = useTranslation("profile_login")
    const [email, setEmail] = useState('');

    const login = () => {}

    return (
        <Container>
            <Section>
                <LoginWrapper>
                    <Title>{t('greetings')}</Title>
                    <Note>{t('explanation')}</Note>
                    <Form>
                        <Input
                            id={'email'}
                            title={'E-Mail'}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Button onClick={login}>Log In</Button>
                    </Form>
                </LoginWrapper>
            </Section>
        </Container>
    )
}

export default LoginContainer;
