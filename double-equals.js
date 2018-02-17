// 7.2.13 Abstract Equality Comparison
// <https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison>

// The comparison x == y, where x and y are values, produces true or false.
// Such a comparison is performed as follows:

module.exports = function doubleEquals (x, y) {
  // 1. If Type(x) is the same as Type(y), then
  //    a. Return the result of performing Strict Equality Comparison x === y.
  if (Type(x) === Type(y)) {
    return x === y
  }

  // 2. If x is null and y is undefined, return true.
  if ((x === null) && (y === undefined)) {
    return true
  }

  // 3. If x is undefined and y is null, return true.
  if ((x === undefined) && (y === null)) {
    return true
  }

  // 4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ToNumber(y).
  if ((Type(x) === Type.number) && (Type(y) === Type.string)) {
    return doubleEquals(x, ToNumber(y))
  }

  // 5. If Type(x) is String and Type(y) is Number, return the result of the comparison ToNumber(x) == y.

  // 6. If Type(x) is Boolean, return the result of the comparison ToNumber(x) == y.

  // 7. If Type(y) is Boolean, return the result of the comparison x == ToNumber(y).

  // 8. If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).

  // 9. If Type(x) is Object and Type(y) is either String, Number, or Symbol, return the result of the comparison ToPrimitive(x) == y.

  // 10. Return false.
  return false
}

// 6.1 ECMAScript Language Types
// https://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types
function Type (value) {
  if (value === undefined) {
    return Type.undefined
  } else if (value === null) {
    return Type.null
  } else {
    return Type[typeof value]
  }
}
Type.undefined = Symbol('Undefined')
Type.null = Symbol('Null')
Type.boolean = Symbol('Boolean')
Type.string = Symbol('String')
Type.symbol = Symbol('Symbol')
Type.number = Symbol('Number')
Type.object = Symbol('Object')

// 7.1.1 ToPrimitive
// https://www.ecma-international.org/ecma-262/#sec-toprimitive
function ToPrimitive (input, hint = 'default') {
  // 2. If Type(input) is Object, then
  if (Type(input) === Type.object) {
    // d. Let exoticToPrim be ? GetMethod(input, @@toPrimitive).
    let exoticToPrim = input[Symbol.toPrimitive]
    // e. If exoticToPrim is not undefined, then
    if (exoticToPrim !== undefined) {
      // i. Let result be ? Call(exoticToPrim, input, « hint »).
      let result = exoticToPrim.call(input, hint)
      // ii. If Type(result) is not Object, return result.
      if (Type(result) !== Type.object) {
        return result
      }
      // iii. Throw a TypeError exception.
      throw new TypeError('Cannot convert object to primitive value')
    }
    // f. If hint is "default", set hint to "number".
    if (hint === 'default') { hint = 'number' }
    // g. Return ? OrdinaryToPrimitive(input, hint).
    return OrdinaryToPrimitive(input, hint)
  }

  // 3 Return input.
  return input
}

function OrdinaryToPrimitive (o, hint) {
  // 2. Assert: Type(hint) is String and its value is either "string" or "number".
  if (!new Set(['string', 'number']).has(hint)) {
    throw new Error('hint must be string or number')
  }

  let methodNames

  // 3. If hint is "string", then
  if (hint === 'string') {
    // a. Let methodNames be « "toString", "valueOf" ».
    methodNames = ['toString', 'valueOf']

  // 4. Else,
  } else {
    // a. Let methodNames be « "valueOf", "toString" ».
    methodNames = ['valueOf', 'toString']
  }

  // 5. For each name in methodNames in List order, do
  for (let name of methodNames) {
    // a. Let method be ? Get(O, name).
    let method = o[name]
    // b. If IsCallable(method) is true, then
    if (IsCallable(method)) {
      // i. Let result be ? Call(method, O).
      // ii. If Type(result) is not Object, return result.
    }
  }

  // 6. Throw a TypeError exception.
  throw new TypeError()
}

// 7.1.3 ToNumber
// https://www.ecma-international.org/ecma-262/#sec-tonumber
function ToNumber (argument) {
  switch (Type(argument)) {
    case Type.undefined:
      return NaN
    case Type.null:
      return +0
    case Type.boolean:
      return argument === true ? 1 : +0
    case Type.number:
      return argument
    case Type.string:
      return Number(argument)
    case Type.symbol:
      throw new TypeError('Cannot convert a Symbol value to a number')
    case Type.object:
      // TODO
  }
}

// 7.2.3 IsCallable
// https://www.ecma-international.org/ecma-262/#sec-iscallable
function IsCallable (argument) {
  // 1. If Type(argument) is not Object, return false.
  if (Type(argument) !== Type.object) {
    return false
  }

  // 2. If argument has a [[Call]] internal method, return true.
  if (argument
  // 3. Return false.
}
