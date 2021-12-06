import { calculateBasis } from "./helpers"

const testObject = {
  contentWidth: 0,
  gap: 0,
  padding: 0,
  basis: 0,
  toShow: 0
}

test("maths", () => {
  const gap = 20
  const padding = 10
  const toShow = 2
  const contentWidth = 1000
  const startOffset = 20

  const expected = 460

  expect(
    calculateBasis({
      gap,
      padding,
      toShow,
      contentWidth,
      startOffset
    })
  ).toEqual(expected)
})
