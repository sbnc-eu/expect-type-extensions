# Expect Type Extensions
This package provides additional type testing methods for the [`expect-type`](https://github.com/mmkal/expect-type) compile-time test suite for types.

## Goal

Sometimes, we want to test whether two types can be used interchangeably, i.e., ensure that while they may not be equal, they can be assigned to each other.

For example:
```typescript
type Foo = { a: string, b: number }
type Bar = { a: string } & { b: number }
```

In practice, we can assign anything of type `Foo` to anything of type `Bar` and vice versa. So, from a practical point of view, these types are compatible. We naturally want to test for this kind of relationship between types.

## Challenge

While `expect-type` is a great utility, it is a bit suboptimal for this particular case. We cannot use a single `toEqualTypeOf`, as both of these would result in an error:
```typescript
expectTypeOf<Foo>().toEqualTypeOf<Bar>() // error, but we want a pass
expectTypeOf<Bar>().toEqualTypeOf<Foo>() // error, but we want a pass
```

This means we would need to resort to two `toMatchTypeOf` tests:
```typescript
expectTypeOf<Foo>().toMatchTypeOf<Bar>()
expectTypeOf<Bar>().toMatchTypeOf<Foo>()
```

We need both lines because in the following case, only one of them shows the issue:
```typescript
type Baz = { a: string, b: number, c: boolean }

expectTypeOf<Baz>().toMatchTypeOf<Foo>() // seems okay
expectTypeOf<Foo>().toMatchTypeOf<Baz>() // but this line shows the issue with Baz being incompatible
```

However, it can be a bit hard to read and maintain: always writing double test lines for this kind of scenario. 

## Solution

This utility provides a single `.toMatchEachOther<>()` method which can be used to test for this kind of relationship between types.

With this in place, we can now write what took us 4 tests before in only 2 lines:
```typescript
expectTypeOf<Foo>().toMatchEachOther<Bar>() // pass
expectTypeOf<Foo>().toMatchEachOther<Baz>() // error, Baz is not compatible
```

If the second one is the expected behaviour, we can use the `.not.toMatchEachOther<>()` method instead:
```typescript
expectTypeOf<Foo>().not.toMatchEachOther<Baz>() // pass
```

## Usage

### Installation

Install using npm or your choice of package manager, e.g.:

`npm install --save-dev @sbnc/expect-type-extensions`

### Importing

To use the new utilities, make sure to import this package along with `expect-type`, e.g.:

```typescript
import { expectTypeOf } from 'expect-type'
import '@sbnc/expect-type-extensions'
```

Note: There is no need for a `{...} from` part in the import statement.

***

Bence Szalai - https://sbnc.eu/
