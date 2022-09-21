/**
 * Paginate an array into multiple arrays depending on perPage param
 *
 * @param data data to paginate
 * @param perPage length of data per page
 */
export const paginate = <T>(data: T[], perPage: number): T[][] => {
  const nPages = Math.ceil(data.length / perPage)
  const paginatedData = new Array(nPages)

  for (let i = 0; i < nPages; i++) {
    paginatedData[i] = data.slice(i * perPage, i * perPage + perPage)
  }

  return paginatedData
}
