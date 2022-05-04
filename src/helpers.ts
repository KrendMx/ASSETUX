export const ellipsisString = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength) + "..."
  }

  return value
}

export const stringToPieces = (
  string: string,
  pieceLength: number,
  delimeter: string
): string => {
  const piecesLength = Math.ceil(string.length / pieceLength)
  const pieces = new Array(piecesLength)
  for (let i = 0; i < piecesLength; i++) {
    pieces[i] = string.slice(i * pieceLength, i * pieceLength + pieceLength)
  }

  return pieces.join(delimeter)
}

export const capitalizeString = (value: string) => {
  if (value.length == 0) {
    return value
  }

  return value[0].toUpperCase() + value.slice(1)
}

export const updateURL = (newUrl: string) => {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    "",
    newUrl
  )
}

export type QueryObject = {
  [key: string]: string | undefined
}

export const mapQueryObject = (query: QueryObject) => {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
}
