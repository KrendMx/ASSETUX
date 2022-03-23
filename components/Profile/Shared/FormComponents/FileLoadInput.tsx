import React from "react";
import styled from "styled-components";
import {BaseInputWrapper} from "./Input";

type FileLoadInputProps = {
    title: string;
    selectedFile: string;
    id?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Wrapper = styled(BaseInputWrapper)``

const Title = styled.label``

const LoaderWrapper = styled.div``

const Label = styled.label`
  color: #1969FF;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
`

const Upload = styled.input.attrs(props => ({
    type: "file"
}))`
  display: none;
`

const SelectedFile = styled.p`
  color: var(--black);
  font-weight: 500;
`

function FileLoadInput({title, id, selectedFile, onChange}: FileLoadInputProps) {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <LoaderWrapper>
                {
                    selectedFile ?
                        <SelectedFile>{selectedFile}</SelectedFile> :
                        (<>
                            <Label htmlFor={id}>Upload</Label>
                            <Upload onChange={onChange} id={id}/>
                        </>)
                }
            </LoaderWrapper>
        </Wrapper>
    )
}

export default FileLoadInput;
