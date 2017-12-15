/**
 * The intent here is to extend Array functionality on its prototype
 * or "fix" whatever may be incorrect for this app's purpose.
 *
 * DO NOT use arrow functions as they capture the wrong `this` as `window`
 *
 * File order is:
 *  - Interface for TS typings
 *  - Logic guards for the overrides/additions
 *  - Function implementations
 *
 */



// Interface ==================================================

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


(function() { // anything that is not the interface is not exposed globally

// Guards ==================================================

    // Fix functions that work on the actual array instead of returning a new one
    const nativeReverse = Array.prototype.reverse;
    if (isNative('reverse')) {
        Array.prototype.reverse = reverse;
    }

    const nativeSort = Array.prototype.sort;
    if (isNative('sort')) {
        Array.prototype.sort = sort;
    }
    // -----

    if (!Array.prototype.flatMap) {
        Array.prototype.flatMap = flatMap;
    }

    if (!Array.prototype.groupBy) {
        Array.prototype.groupBy = groupBy;
    }

    if (!Array.prototype.min) {
        Array.prototype.min = min;
    }

    if (!Array.prototype.max) {
        Array.prototype.max = max;
    }

    if (!Array.prototype.sortBy) {
        Array.prototype.sortBy = sortBy;
    }

    if (!Array.prototype.toHashMap) {
        Array.prototype.toHashMap = toHashMap;
    }



// Functions ==================================================

    function isNative(func: string): boolean {
        return /.*\[native code\].*/g.test( Array.prototype[func].toString() );
    }

    function flatMap<T, U>(propertyFn: (item: T, index: number, array: T[]) => U[], thisArg?: any): U[] {
        return this.reduce(
            (flatten, item, index, array) =>
                [ ...flatten, propertyFn(item, index, array) ]
                , []);
    }

    function groupBy<T>(propertyFn: (item: T, index: number, array: T[]) => number | string): { [id: string]: T[] } {
        return this.reduce(
            (group, item, index, array) => {
                const id = '' + propertyFn(item, index, array);
                return {
                    ...group,
                    [id]: [ ...( group[id] || [] ), item ]
                };
            }
            , {});
    }

    function min(): number {
        if (this.length) {
            return Math.min(...this);
        }
    }

    function max(): number {
        if (this.length) {
            return Math.max(...this);
        }
    }

    function reverse<T>(): T[] {
        return nativeReverse.call(this.slice());
    }

    function sort<T>(compareFn?: (a: T, b: T) => number): T[] {
        return nativeSort.call(this.slice(), compareFn);
    }

    function sortBy<T>(propertyFn: (item: T) => any): T[] {
        return this.sort((a, b) => {
            const aProp = propertyFn(a);
            const bProp = propertyFn(b);

            if (!aProp && !bProp) {
                return 0;
            }

            if (!aProp || aProp > bProp) {
                return 1;
            }

            if (!bProp || aProp < bProp) {
                return -1;
            }

            return 0;
        });
    }

    function toHashMap<T>(propertyFn: (item: T, index: number) => string | number): { [id: string]: T } {
        return this.reduce(
            (hashMap, item, index) => (
                { ...hashMap, ['' + propertyFn(item, index)]: item }
            ),
            {});
    }

})();
