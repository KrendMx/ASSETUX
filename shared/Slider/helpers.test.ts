import { calculateBasis } from "./helpers"

const testObject = {
  contentWidth: 0,
  gap: 0,
  padding: 0,
  basis: 0,
  toShow: 0
}

test("passed basis is equal to returned", () => {
  const basis = 300

  expect(
    calculateBasis({
      ...testObject,
      basis
    })
  ).toEqual(basis)
})

test("if no toShow passed return 0", () => {
  expect(
    calculateBasis({
      contentWidth: 0,
      gap: 0,
      padding: 0
    })
  ).toEqual(0)
})

test("maths", () => {
  const gap = 20
  const padding = 10
  const toShow = 2
  const contentWidth = 1000

  const expected = 480

  expect(
    calculateBasis({
      gap,
      padding,
      toShow,
      contentWidth
    })
  ).toEqual(expected)
})
