

type A = { a: string }
type B = { b: number }
type C = { c: boolean }


// 1.)
// @ts-expect-error
expectTypeOf<{ a: string } & { b: number }>().toEqualTypeOf<{ a: string, b: number }>()
// @ts-expect-error
expectTypeOf<{ a: string, b: number }>().toEqualTypeOf<{ a: string } & { b: number }>()

// 2.)
expectTypeOf<{ a: string } & { b: number }>().toMatchTypeOf<{ a: string, b: number }>()
expectTypeOf<{ a: string, b: number }>().toMatchTypeOf<{ a: string } & { b: number }>()

// 3.)
expectTypeOf<{ a: string } & { b: number } & { c : boolean }>().toMatchTypeOf<{ a: string, b: number }>()
// @ts-expect-error
expectTypeOf<{ a: string, b: number }>().toMatchTypeOf<{ a: string } & { b: number } & { c: boolean }>()


expectTypeOf<{ a: string, b: number }>().toMatchEachOther<{ a: string } & { b: number }>()
expectTypeOf<{ a: string, b: number }>().not.toMatchEachOther<{ a: string } & { b: number } & { c: boolean }>()


type Foo = { a: string, b: number }
type Bar = { a: string } & { b: number }
type Baz = { a: string, b: number, c: boolean }
type Qux = { a: string } & { b: number } & { c: boolean }

// 1.)
// @ts-expect-error
expectTypeOf<Foo>().toEqualTypeOf<Bar>()
// @ts-expect-error
expectTypeOf<Bar>().toEqualTypeOf<Foo>()

// 2.)
expectTypeOf<Foo>().toMatchTypeOf<Bar>()
expectTypeOf<Bar>().toMatchTypeOf<Foo>()

// 3.)
expectTypeOf<Baz>().toMatchTypeOf<Foo>() // seems okay
// @ts-expect-error
expectTypeOf<Foo>().toMatchTypeOf<Baz>() // but this line shows the issue

expectTypeOf<Qux>().toMatchTypeOf<Foo>() // seems okay
// @ts-expect-error
expectTypeOf<Foo>().toMatchTypeOf<Qux>() // but this line shows the issue

// 4.)
expectTypeOf<Foo>().toMatchEachOther<Bar>()
expectTypeOf<Foo>().not.toMatchEachOther<Baz>()
expectTypeOf<Foo>().not.toMatchEachOther<Qux>()


// Additional expect-type notes
// ============================

// toMatchTypeOf means that the left side can be assigned to the right side:

import { expectTypeOf } from 'expect-type'

expectTypeOf<{a: string }>().toMatchTypeOf<{a: string | null}>()
expectTypeOf<{a: string | null}>().not.toMatchTypeOf<{a: string}>()

expectTypeOf<string | null>().not.toMatchTypeOf<string>()
expectTypeOf<string>().toMatchTypeOf<string | null>()

expectTypeOf<string | null>().not.toMatchEachOther<string>()
expectTypeOf<string>().not.toMatchEachOther<string | null>()

expectTypeOf( { a: 1, b: 1 } ).toMatchTypeOf( { a: 1 } )
expectTypeOf( { a: 1, b: 1 } ).not.toMatchTypeOf( { a: 1, b: 1, c: 1 } )


// Additional TypeScript notes
// ===========================
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Unknown, any and never:
let test1: unknown extends unknown ? true : false // true
let test2: unknown extends any ? true : false // true
let test3: unknown extends never ? true : false // false
let test4: any extends any ? true : false // true
let test5: any extends unknown ? true : false // true
let test6: any extends never ? true : false // boolean
let test7: never extends any ? true : false // true
let test8: never extends unknown ? true : false // true
let test9: never extends never ? true : false // true

// Unknown, any and never vs example primitive type:
let test11: unknown extends number ? true : false // false
let test12: number extends unknown ? true : false // true
let test13: any extends number ? true : false // boolean
let test14: number extends any ? true : false // true
let test15: never extends number ? true : false // true
let test16: number extends never ? true : false // false
