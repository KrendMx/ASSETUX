import { cardsPerPage } from "@/lib/data/constants"
import {
  ButtonsContainer,
  Card,
  Row,
  RowName,
  RowSpacer,
  RowValue
} from "./styles"
import { ActionElement, CardData } from "./types"

export const mapCards = (
  rowNames: string[],
  currentPage: number,
  cardData?: CardData[][],
  buttons?: ActionElement[]
) =>
  cardData?.map((data, paginatedDataIndex) => {
    const currentIndex = (currentPage - 1) * cardsPerPage + paginatedDataIndex

    const buttonComponents =
      buttons && buttons.map((button) => button(currentIndex))

    return (
      <Card key={`card-${currentIndex}`}>
        <RowSpacer>
          {rowNames?.map((name, index) => {
            const item = data[index].value

            return (
              <Row key={`cardRow-${name}-${index}`} withSpace={name != ""}>
                <RowName>{name}</RowName>
                <RowValue>{item}</RowValue>
              </Row>
            )
          })}
        </RowSpacer>
        {buttonComponents &&
          buttonComponents.some((element) => element != null) && (
            <ButtonsContainer>{buttonComponents}</ButtonsContainer>
          )}
      </Card>
    )
  })
