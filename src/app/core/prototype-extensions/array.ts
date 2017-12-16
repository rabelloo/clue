/**
 * The intent here is to extend Array functionality on its prototype
 * or "fix" whatever may be incorrect for this app's purpose.
 *
 * DO NOT use arrow functions as they capture the wrong `this` as `window`
 *
 * This file (.d.ts):
 *  - Interface for TS typings
 *
 * Other file (.ts):
 *  - Logic guards for the overrides/additions
 *  - Function implementations
 */

interface Array<T> {
    /**
     * Flattens the array to a property defined on the function parameter
     */
    flatMap<U>(propertyFn: (item: T, index: number, array: T[]) => U[], thisArg?: any): U[];
    /**
     * Groups the array by a property defined on the function parameter
     */
    groupBy(propertyFn: (item: T, index: number, array: T[]) => string | number): { [id: string]: T[] };
    /**
     * Returns the smallest number in the array
     */
    min(): number;
    /**
     * Returns the largest number in the array
     */
    max(): number;
    /**
     * Sorts the array by the property defined on the function parameter
     */
    sortBy(propertyFn: (item: T) => any): T[];
    /**
     * Transforms the array into a HashMap object using the specified property as an index
     *
     * Example:
     * `[{ id: 4, name: 'John'}, {id: 1, name: 'Mary'}].toHashMap(x => x.id)`
     *
     * =>
     * `{ 1: {id: 1, name: 'Mary'}, 4: { id: 4, name: 'John'}}`
     */
    toHashMap(propertyFn: (item: T, index: number) => string | number): { [id: string]: T };
}
