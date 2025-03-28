import {expect} from "assertions"

import {
  ndarray, is_NDArray,
  Uint8NDArray, Int8NDArray,
  Uint16NDArray, Int16NDArray,
  Uint32NDArray, Int32NDArray,
  Float32NDArray, Float64NDArray,
  ObjectNDArray,
} from "@bokehjs/core/util/ndarray"

import {Cloner} from "@bokehjs/core/util/cloneable"

describe("core/util/ndarray module", () => {

  it("should support is_NDArray predicate", () => {
    const nd0 = new Uint8NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    const nd1 = new Int8NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd1)).to.be.true
    const nd2 = new Uint16NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd2)).to.be.true
    const nd3 = new Int16NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd3)).to.be.true
    const nd4 = new Uint32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd4)).to.be.true
    const nd5 = new Int32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd5)).to.be.true
    const nd6 = new Float32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd6)).to.be.true
    const nd7 = new Float64NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd7)).to.be.true

    const a0 = new Uint8Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a0)).to.be.false
    const a1 = new Int8Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a1)).to.be.false
    const a2 = new Uint16Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a2)).to.be.false
    const a3 = new Int16Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a3)).to.be.false
    const a4 = new Uint32Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a4)).to.be.false
    const a5 = new Int32Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a5)).to.be.false
    const a6 = new Float32Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a6)).to.be.false
    const a7 = new Float64Array([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(a7)).to.be.false

    expect(is_NDArray([1, 2, 3, 4, 5, 6])).to.be.false
  })

  it("should support Uint8NDArray", () => {
    const nd0 = new Uint8NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("uint8")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Uint8NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint8")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Uint8NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint8")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Uint8Array(6)
    const nd3 = new Uint8NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint8")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(1*6)
    const nd4 = new Uint8NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("uint8")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("uint8")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Uint16NDArray", () => {
    const nd0 = new Uint16NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("uint16")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Uint16NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint16")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Uint16NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint16")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Uint16Array(6)
    const nd3 = new Uint16NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint16")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(2*6)
    const nd4 = new Uint16NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("uint16")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("uint16")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Uint32NDArray", () => {
    const nd0 = new Uint32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("uint32")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Uint32NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint32")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Uint32NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint32")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Uint32Array(6)
    const nd3 = new Uint32NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint32")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(4*6)
    const nd4 = new Uint32NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("uint32")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("uint32")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Int8NDArray", () => {
    const nd0 = new Int8NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("int8")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Int8NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("int8")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Int8NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("int8")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Int8Array(6)
    const nd3 = new Int8NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("int8")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(1*6)
    const nd4 = new Int8NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int8")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int8")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Int16NDArray", () => {
    const nd0 = new Int16NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("int16")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Int16NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("int16")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Int16NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("int16")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Int16Array(6)
    const nd3 = new Int16NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("int16")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(2*6)
    const nd4 = new Int16NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int16")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int16")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Int32NDArray", () => {
    const nd0 = new Int32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("int32")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Int32NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("int32")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Int32NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("int32")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Int32Array(6)
    const nd3 = new Int32NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("int32")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(4*6)
    const nd4 = new Int32NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int32")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int32")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Float32NDArray", () => {
    const nd0 = new Float32NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("float32")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Float32NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("float32")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Float32NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("float32")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Float32Array(6)
    const nd3 = new Float32NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("float32")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(4*6)
    const nd4 = new Float32NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("float32")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("float32")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support Float64NDArray", () => {
    const nd0 = new Float64NDArray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("float64")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)

    const nd1 = new Float64NDArray([1, 2, 3, 4, 5, 6], [2, 3])
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("float64")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = new Float64NDArray(nd1, [3, 2])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("float64")
    expect(nd2.shape).to.be.equal([3, 2])
    expect(nd2.length).to.be.equal(6)

    const a3 = new Float64Array(6)
    const nd3 = new Float64NDArray(a3, [2, 3])
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("float64")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const b4 = new ArrayBuffer(8*6)
    const nd4 = new Float64NDArray(b4, [2, 3])
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("float64")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = new Cloner().clone(nd4)
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("float64")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)
    expect(nd5.buffer).to.not.be.identical(nd4.buffer)
    expect(nd5.shape).to.not.be.identical(nd4.shape)
  })

  it("should support ObjectNDArray", () => {
    const nd0 = new ObjectNDArray([null, 1, "a", true, [1, 2, 3], {foo: 1}])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("object")
    expect(nd0.shape).to.be.equal([6])
    expect(nd0.length).to.be.equal(6)
    expect(nd0.dimension).to.be.equal(1)

    const nd1 = nd0.concat(new ObjectNDArray([false, 2, "b"])) as ObjectNDArray
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("object")
    expect(nd1.shape).to.be.equal([9])
    expect(nd1.length).to.be.equal(9)
    expect(nd1.dimension).to.be.equal(1)

    const nd2 = new ObjectNDArray([false, 0, "a", true, 1, "b"], [2, 3])
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("object")
    expect(nd2.shape).to.be.equal([2, 3])
    expect(nd2.length).to.be.equal(6)
    expect(nd2.dimension).to.be.equal(2)

    const nd3 = new Cloner().clone(nd2)
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("object")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)
    expect(nd3).to.not.be.identical(nd2)
    expect(nd3.shape).to.not.be.identical(nd2.shape)
  })

  it("should support ndarray() function without dtype", () => {
    const nd0 = ndarray([1, 2, 3, 4, 5, 6])
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("object")
    expect(nd0.shape).to.be.equal([6])
  })

  it("should support ndarray() width dtype", () => {
    const nd0 = ndarray([1, 0, 0, 1, 1, 1], {dtype: "bool"})
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("bool")
    expect(nd0.shape).to.be.equal([6])

    const nd1 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint8"})
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint8")
    expect(nd1.shape).to.be.equal([6])

    const nd2 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint16"})
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint16")
    expect(nd2.shape).to.be.equal([6])

    const nd3 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint32"})
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint32")
    expect(nd3.shape).to.be.equal([6])

    const nd4 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int8"})
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int8")
    expect(nd4.shape).to.be.equal([6])

    const nd5 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int16"})
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int16")
    expect(nd5.shape).to.be.equal([6])

    const nd6 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int32"})
    expect(is_NDArray(nd6)).to.be.true
    expect(nd6.dtype).to.be.equal("int32")
    expect(nd6.shape).to.be.equal([6])

    const nd7 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "float32"})
    expect(is_NDArray(nd7)).to.be.true
    expect(nd7.dtype).to.be.equal("float32")
    expect(nd7.shape).to.be.equal([6])

    const nd8 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "float64"})
    expect(is_NDArray(nd8)).to.be.true
    expect(nd8.dtype).to.be.equal("float64")
    expect(nd8.shape).to.be.equal([6])

    class X {}
    const nd9 = ndarray([null, 2, new X(), [1, 2], new Map(), new Set()], {dtype: "object", shape: [2, 3]})
    expect(is_NDArray(nd9)).to.be.true
    expect(nd9.dtype).to.be.equal("object")
    expect(nd9.shape).to.be.equal([2, 3])
  })

  it("should support ndarray() with dtype and shape", () => {
    const nd0 = ndarray([1, 0, 0, 1, 1, 1], {dtype: "bool", shape: [2, 3]})
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("bool")
    expect(nd0.shape).to.be.equal([2, 3])

    const nd1 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint8", shape: [2, 3]})
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint8")
    expect(nd1.shape).to.be.equal([2, 3])

    const nd2 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint16", shape: [2, 3]})
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint16")
    expect(nd2.shape).to.be.equal([2, 3])

    const nd3 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "uint32", shape: [2, 3]})
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint32")
    expect(nd3.shape).to.be.equal([2, 3])

    const nd4 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int8", shape: [2, 3]})
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int8")
    expect(nd4.shape).to.be.equal([2, 3])

    const nd5 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int16", shape: [2, 3]})
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int16")
    expect(nd5.shape).to.be.equal([2, 3])

    const nd6 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "int32", shape: [2, 3]})
    expect(is_NDArray(nd6)).to.be.true
    expect(nd6.dtype).to.be.equal("int32")
    expect(nd6.shape).to.be.equal([2, 3])

    const nd7 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "float32", shape: [2, 3]})
    expect(is_NDArray(nd7)).to.be.true
    expect(nd7.dtype).to.be.equal("float32")
    expect(nd7.shape).to.be.equal([2, 3])

    const nd8 = ndarray([1, 2, 3, 4, 5, 6], {dtype: "float64", shape: [2, 3]})
    expect(is_NDArray(nd8)).to.be.true
    expect(nd8.dtype).to.be.equal("float64")
    expect(nd8.shape).to.be.equal([2, 3])

    class X {}
    const nd9 = ndarray([null, 2, new X(), [1, 2], new Map(), new Set()], {dtype: "object", shape: [2, 3]})
    expect(is_NDArray(nd9)).to.be.true
    expect(nd9.dtype).to.be.equal("object")
    expect(nd9.shape).to.be.equal([2, 3])
  })

  it("should support ndarray() with dtype and shape, and size initializer", () => {
    const nd0 = ndarray(6, {dtype: "bool", shape: [2, 3]})
    expect(is_NDArray(nd0)).to.be.true
    expect(nd0.dtype).to.be.equal("bool")
    expect(nd0.shape).to.be.equal([2, 3])
    expect(nd0.length).to.be.equal(6)

    const nd1 = ndarray(6, {dtype: "uint8", shape: [2, 3]})
    expect(is_NDArray(nd1)).to.be.true
    expect(nd1.dtype).to.be.equal("uint8")
    expect(nd1.shape).to.be.equal([2, 3])
    expect(nd1.length).to.be.equal(6)

    const nd2 = ndarray(6, {dtype: "uint16", shape: [2, 3]})
    expect(is_NDArray(nd2)).to.be.true
    expect(nd2.dtype).to.be.equal("uint16")
    expect(nd2.shape).to.be.equal([2, 3])
    expect(nd2.length).to.be.equal(6)

    const nd3 = ndarray(6, {dtype: "uint32", shape: [2, 3]})
    expect(is_NDArray(nd3)).to.be.true
    expect(nd3.dtype).to.be.equal("uint32")
    expect(nd3.shape).to.be.equal([2, 3])
    expect(nd3.length).to.be.equal(6)

    const nd4 = ndarray(6, {dtype: "int8", shape: [2, 3]})
    expect(is_NDArray(nd4)).to.be.true
    expect(nd4.dtype).to.be.equal("int8")
    expect(nd4.shape).to.be.equal([2, 3])
    expect(nd4.length).to.be.equal(6)

    const nd5 = ndarray(6, {dtype: "int16", shape: [2, 3]})
    expect(is_NDArray(nd5)).to.be.true
    expect(nd5.dtype).to.be.equal("int16")
    expect(nd5.shape).to.be.equal([2, 3])
    expect(nd5.length).to.be.equal(6)

    const nd6 = ndarray(6, {dtype: "int32", shape: [2, 3]})
    expect(is_NDArray(nd6)).to.be.true
    expect(nd6.dtype).to.be.equal("int32")
    expect(nd6.shape).to.be.equal([2, 3])
    expect(nd6.length).to.be.equal(6)

    const nd7 = ndarray(6, {dtype: "float32", shape: [2, 3]})
    expect(is_NDArray(nd7)).to.be.true
    expect(nd7.dtype).to.be.equal("float32")
    expect(nd7.shape).to.be.equal([2, 3])
    expect(nd7.length).to.be.equal(6)

    const nd8 = ndarray(6, {dtype: "float64", shape: [2, 3]})
    expect(is_NDArray(nd8)).to.be.true
    expect(nd8.dtype).to.be.equal("float64")
    expect(nd8.shape).to.be.equal([2, 3])
    expect(nd8.length).to.be.equal(6)

    const nd9 = ndarray(6, {dtype: "object", shape: [2, 3]})
    expect(is_NDArray(nd9)).to.be.true
    expect(nd9.dtype).to.be.equal("object")
    expect(nd9.shape).to.be.equal([2, 3])
    expect(nd9.length).to.be.equal(6)
  })
})
