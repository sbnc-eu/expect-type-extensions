/**
 * This file extends the default expect-type types to add the following:
 * - `toMatchEachOther<>`
 * - `toNotMatchEachOther<>`
 */

import type { Eq, IsNever, ExpectTypeOfOptions } from 'expect-type'

declare module 'expect-type' {
  type MismatchArgs<ActualResult extends boolean, ExpectedResult extends boolean> = Eq<ActualResult, ExpectedResult> extends true ? [] : [never]; // only needed to redeclare, because not exported

  type IsNotNever<T> = IsNever<T> extends true ? false : true;

  export type MutuallyExtends<L, R> = IsNever<L> extends true ? IsNever<R> : [L] extends [R] ? [R] extends [L] ? true : false : false;
  export type MutuallyNotExtends<L, R> = IsNever<L> extends true ? IsNotNever<R> : IsNever<R> extends true ? IsNotNever<L> : [L] extends [R] ? [R] extends [L] ? false : false : true;

  export interface ExpectTypeOf<Actual, Options extends ExpectTypeOfOptions> {
    toMatchEachOther: {
      <Expected>( ...MISMATCH: MismatchArgs<MutuallyExtends<Actual, Expected>, Options['positive']> ): true;
      <Expected>( expected: Expected, ...MISMATCH: MismatchArgs<MutuallyExtends<Actual, Expected>, Options['positive']> ): true;
    };
    toNotMatchEachOther: {
      <Expected>( ...MISMATCH: MismatchArgs<MutuallyNotExtends<Actual, Expected>, Options['positive']> ): true;
      <Expected>( expected: Expected, ...MISMATCH: MismatchArgs<MutuallyNotExtends<Actual, Expected>, Options['positive']> ): true;
    };
  }
}
