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
    sortBy(propertyFn: (item: T) => any): T[];
}


(function() { // anything that is not the interface is not exposed globally
    
// Guards ==================================================

    // Fix functions that work on the actual array instead of returning a new one
    const nativeReverse = Array.prototype.reverse;
    if (isNative('reverse'))
        Array.prototype.reverse = reverse;
    
    const nativeSort = Array.prototype.sort;
    if (isNative('sort'))
        Array.prototype.sort = sort;
    // -----

    if (!Array.prototype.sortBy)
        Array.prototype.sortBy = sortBy;



// Functions ==================================================

    function isNative(func) {
        return /.*\[native code\].*/g.test( Array.prototype[func].toString() );
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
          
          if (!aProp && !bProp)
            return 0;
       
          if (!aProp || aProp > bProp)
            return 1;
       
          if (!bProp || aProp < bProp)
            return -1;
             
          return 0;
        });
      }


})();
