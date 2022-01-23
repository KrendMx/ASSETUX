/**
 * Paginate an array into multiple arrays depending on perPage param
 *
 * @param data data to paginate
 * @param perPage lenght of data per page
 */
export const paginate = <T>(data: T[], perPage: number): T[][] => {
  const nPages = Math.ceil(data.length / perPage)
  const paginatedData = new Array(nPages)

  for (let i = 0; i < nPages; i++) {
    paginatedData[i] = data.slice(i * perPage, i * perPage + perPage)
  }

  return paginatedData
}

/**
 * Generate an array of pages
 *
 * @param pages number of all pages
 * @param currentPage current page
 */
export const generatePageNumbers = (
  pages: number,
  currentPage: number
): number[] => {
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
