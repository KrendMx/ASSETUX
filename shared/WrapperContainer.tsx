import styled from "styled-components";
import {mobile} from "@/src/constants";


const WrapperContainer = styled.div`
  width: 100%;
  padding: 74px 0;
  font-size: 1em;

  & > section {
    padding: 0 var(--paddings);
  }

  h1,
  h3 {
    font-size: 2.6em;
    color: var(--black);
  }

  @media only screen and (max-width: ${mobile}px) {
    padding: 44px 0 30px;
  }
`

export default WrapperContainer;
