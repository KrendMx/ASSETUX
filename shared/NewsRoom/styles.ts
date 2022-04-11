import styled from "styled-components"

import AdaptiveFont from "@/shared/AdaptiveFont"

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  // override page padding
  padding: 0 !important;
`

export const Row = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  padding: 0 var(--paddings);

  & > h3 {
    flex-grow: 1;
  }
`

export const MoreLink = styled(AdaptiveFont).attrs({
  mobileFactor: 1.5,
  tabletFactor: 1.2
})`
  color: var(--blue);
  font-weight: 500;
  text-decoration: none;
`

export const SliderContainer = styled.div`
  display: block;
  width: 100%;
`
