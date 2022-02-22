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

/*
  toFixedAmount -
  если строка пустая то вернет '' 
  если инпут равен 0 то 0 без нулей после запятой 
  если больше 0 то вернет число с двумя числами после запятой
*/
export const toFixedAmount = (amount:string):string => (isNaN(parseFloat(amount))) ? '' : parseFloat(amount) === 0 ? '0' : parseFloat(amount).toFixed(2) 