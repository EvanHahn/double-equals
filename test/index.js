const doubleEquals = require('../double-equals')
const assert = require('assert')
const { inspect } = require('util')

const NUMBERS = [
  -0,
  +0,
  -1,
  1,
  -1.5,
  1.5,
  Number.EPSILON,
  Number.MIN_VALUE,
  Number.MAX_VALUE,
  Number.MIN_SAFE_INTEGER,
  Number.MAX_SAFE_INTEGER,
  Infinity,
  -Infinity,
  NaN
]

const ALL_VALUES = NUMBERS

describe('doubleEquals', () => {
  it('always returns the same results as ==', () => {
    ALL_VALUES.forEach((a) => {
      ALL_VALUES.forEach((b) => {
        const expected = a == b // eslint-disable-line eqeqeq
        const actual = doubleEquals(a, b)
        assert.equal(actual, expected, `doubleEquals(${inspect(a)}, ${inspect(b)}) should be ${expected}`)
      })
    })
  })
})
