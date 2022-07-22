/**
 * Generate an array of pages
 *
 * @param pages number of all pages
 * @param currentPage current page
 */
const generatePages = (pages: number, currentPage: number): number[] => {
  if (pages < 5) {
    return [...Array.from(Array(pages).keys())].map((value) => value + 1)
  }

  const isNearToStart = currentPage - 1 <= 2
  const isNearToEnd = pages - currentPage <= 2

  if (isNearToStart) {
    return [...Array.from(Array(currentPage + 1).keys()), pages - 1].map(
      (value) => value + 1
    )
  }

  if (isNearToEnd) {
    const result = [1]

    for (let i = currentPage - 1; i <= pages; i++) {
      result.push(i)
    }

    return result
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, pages]
}

export default generatePages
