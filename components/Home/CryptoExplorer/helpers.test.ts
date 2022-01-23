import { paginate } from "./helpers"

test("paginate should work as expected in a basic way", () => {
  const data = [1, 2, 3, 4, 5, 6]
  const perPage = 2

  const result = paginate(data, perPage)
  const expectedResult = [
    [1, 2],
    [3, 4],
    [5, 6]
  ]

  expect(result).toEqual(expectedResult)
})

test("paginate should return an empty array if data is empty", () => {
  const data: any[] = []
  const perPage = 2

  const result = paginate(data, perPage)
  const expectedResult: any[] = []

  expect(result).toEqual(expectedResult)
})

test("paginate should work as expected if data length % perPage != 0", () => {
  const data = [1, 2, 3, 4, 5, 6, 7]
  const perPage = 2

  const result = paginate(data, perPage)
  const expectedResult = [[1, 2], [3, 4], [5, 6], [7]]

  expect(result).toEqual(expectedResult)
})

test("paginate should work as expected if data length < perPage", () => {
  const data = [1, 2]
  const perPage = 5

  const result = paginate(data, perPage)
  const expectedResult = [[1, 2]]

  expect(result).toEqual(expectedResult)
})
