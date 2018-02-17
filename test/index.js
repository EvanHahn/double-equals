const doubleEquals = require('../double-equals')
const assert = require('assert')
const { inspect } = require('util')

const booleans = [true, false]
const nulls = [null]
const undefineds = [undefined]
const numbers = [
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
const strings = [
  '',
  'hi',
  '5,6',
  '😈',
  '[object Object]',
  '[object JSON]'
]
const symbols = [
  Symbol(), // eslint-disable-line symbol-description
  Symbol('what'),
  Symbol.for('theheck')
]

const arrays = [
  [],
  ['hi'],
  [1],
  [5, 6]
]

const objects = [
  {},
  Object.create(null),
  { hi: 5 },
  JSON,
  new Date(),
  { [Symbol.toPrimitive]: () => ({ bad: true }) }
]

const objectWrappers = booleans.concat(numbers, strings).map(Object)

const all = [].concat(
  booleans,
  nulls,
  undefineds,
  numbers,
  strings,
  symbols,
  arrays,
  objects,
  objectWrappers
)

describe('doubleEquals', () => {
  it('always returns the same results as ==', () => {
    all.forEach((a) => {
      all.forEach((b) => {
        const expected = a == b // eslint-disable-line eqeqeq
        const actual = doubleEquals(a, b)
        assert.equal(actual, expected, `doubleEquals(${inspect(a)}, ${inspect(b)}) should be ${expected}`)
      })
    })
  })
})
