/**
 * The type `{}` doesn't mean "any empty object", it means "any non-nullish value".
 *
 * Use the `AnyObject` type for objects whose structure is unknown.
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type AnyObject = Record<string, unknown>;

/**
 * Takes a type and makes all properties partial within it.
 *
 * TODO: Implement the SDK & Patch logic -- this should stop being needed as things will be defined as Patches
 */
export type RecursivePartial<T> = T extends object
  ? {
      [P in keyof T]?: RecursivePartial<T[P]>;
    }
  : T;

/**
 * Partial only some properties.
 *
 * eg. PartialSome<FooBarBaz, 'foo' | 'bar'>
 */
export type PartialSome<Type, Keys extends keyof Type> = Pick<Partial<Type>, Keys> &
  Omit<Type, Keys>;

/**
 * Unions all values of an object togethers -- antithesis to `keyof myObj`.
 */
export type ValueOf<T> = T[keyof T];

/**
 * Never allow any properties of `Type`.
 *
 * Utility type, probably never a reason to export.
 */
type Never<Type> = {
  [K in keyof Type]?: never;
};

/**
 * Either TypeA properties or TypeB properties -- never both.
 *
 * @example
 * ```ts
 * type MyType = EitherNotBoth<{ foo: boolean }, { bar: boolean }>;
 *
 * // Valid usages:
 * const objA: MyType = {
 *   foo: true,
 * };
 * const objB: MyType = {
 *   bar: true,
 * };
 *
 * // TS Error -- can't have both properties:
 * const objBoth: MyType = {
 *   foo: true,
 *   bar: true,
 * };
 *
 * // TS Error -- must have at least one property:
 * const objNeither: MyType = {
 * };
 * ```
 */
export type EitherNotBoth<TypeA, TypeB> = (TypeA & Never<TypeB>) | (TypeB & Never<TypeA>);

/**
 * Either TypeA properties or TypeB properties or neither of the properties -- never both.
 *
 * @example
 * ```ts
 * type MyType = EitherOrBoth<{ foo: boolean }, { bar: boolean }>;
 *
 * // Valid usages:
 * const objA: MyType = {
 *   foo: true,
 * };
 * const objB: MyType = {
 *   bar: true,
 * };
 * const objBoth: MyType = {
 *   foo: true,
 *   bar: true,
 * };
 *
 * // TS Error -- can't omit both properties:
 * const objNeither: MyType = {
 * };
 * ```
 */
export type EitherOrBoth<TypeA, TypeB> = EitherNotBoth<TypeA, TypeB> | (TypeA & TypeB);

/**
 * Either TypeA properties or TypeB properties or neither of the properties -- never both.
 *
 * @example
 * ```ts
 * type MyType = EitherOrNone<{ foo: boolean }, { bar: boolean }>;
 *
 * // Valid usages:
 * const objA: MyType = {
 *   foo: true,
 * };
 * const objB: MyType = {
 *   bar: true,
 * };
 * const objNeither: MyType = {
 * };
 *
 * // TS Error -- can't have both properties:
 * const objBoth: MyType = {
 *   foo: true,
 *   bar: true,
 * };
 * ```
 */
export type EitherOrNone<TypeA, TypeB> =
  | EitherNotBoth<TypeA, TypeB>
  | (Never<TypeA> & Never<TypeB>);

export const isInEnum =
  <T extends { [s: string]: unknown }>(e: T) =>
  (token: unknown): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T]);
