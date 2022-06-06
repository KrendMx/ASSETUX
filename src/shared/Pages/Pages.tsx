import React, { useMemo } from "react"
import { IoIosArrowRoundBack } from "react-icons/io"
import Skeleton from "react-loading-skeleton"

import generatePageNumbers from "./generatePageNumbers"

import { Row, Container, Button, ArrowContainer } from "./styles"

type PagesProps = {
  pages?: number
  currentPage?: number
  isLoading?: boolean
  perPageValues?: number[]
  hidePerPageValues?: boolean
  currentPerPageValue?: number
  setPerPageValue?: (perPage: number) => void
  setCurrentPage?: (page: number) => void
}

function Pages({
  pages,
  currentPage = 1,
  isLoading = false,
  perPageValues,
  hidePerPageValues,
  currentPerPageValue,
  setPerPageValue,
  setCurrentPage
}: PagesProps) {
  const pageButtons = useMemo(() => {
    const result: JSX.Element[] = []

    if (pages) {
      const pageNumbers = generatePageNumbers(pages, currentPage)

      for (let i = 0; i < pageNumbers.length; i++) {
        const pageNumber = pageNumbers[i]

        result.push(
          <Button
            key={pageNumber}
            active={pageNumber == currentPage}
            onClick={() => setCurrentPage && setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        )

        const jumping =
          i != pageNumbers.length && pageNumbers[i + 1] - pageNumbers[i] > 1

        if (jumping) {
          result.push(
            <Button key={`jumpButton-${pageNumber}`} nonClickable>
              ...
            </Button>
          )
        }
      }
    }

    return result
  }, [currentPage, pages, setCurrentPage])

  return (
    <Row centerContent={hidePerPageValues || perPageValues == undefined}>
      {isLoading ? (
        <Skeleton containerClassName="skeletonFlexContainer" height={30} />
      ) : (
        <>
          {!hidePerPageValues && perPageValues != undefined && (
            <Container>
              {perPageValues.map((value) => (
                <Button
                  active={currentPerPageValue == value}
                  key={`perPage-${value}`}
                  onClick={() => {
                    setPerPageValue && setPerPageValue(value)
                    setCurrentPage && setCurrentPage(1)
                  }}
                >
                  {value}
                </Button>
              ))}
            </Container>
          )}
          <Container>
            <Button
              disabled={currentPage == 1}
              onClick={() => setCurrentPage && setCurrentPage(currentPage - 1)}
            >
              <ArrowContainer>
                <IoIosArrowRoundBack />
              </ArrowContainer>
            </Button>
            {pageButtons}
            <Button
              disabled={
                pages == undefined || pages == 0 || currentPage == pages
              }
              onClick={() => setCurrentPage && setCurrentPage(currentPage + 1)}
            >
              <ArrowContainer mirror>
                <IoIosArrowRoundBack />
              </ArrowContainer>
            </Button>
          </Container>
        </>
      )}
    </Row>
  )
}

export default Pages
