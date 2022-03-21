import React, {useState} from "react"
import styled from "styled-components"

import WrapperContainer from "@/shared/WrapperContainer";
import FormWrapper from "@/shared/Form/FormWrapper"
import TextInput from "@/shared/Form/TextInput";
import FormButton from "@/shared/Form/FormButton";


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

const LoginWrapper = styled.div`
  max-width: 469px;
  margin: auto;
`

function Login() {
    const [email, setEmail] = useState('');

    return (
        <Container>
            <section>
                <LoginWrapper>
                    <Title>Добро пожаловать в Assetux Commerce</Title>
                    <Note>Войдите в Ваш аккаунт или создайте новый.</Note>
                    <FormWrapper>
                        <TextInput
                            id={'email'}
                            title={'E-Mail'}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            value={email}
                        />
                        <FormButton onClick={() => {}} title={'Log In'}/>
                    </FormWrapper>
                </LoginWrapper>
            </section>
        </Container>
    )
}

export default Login;
