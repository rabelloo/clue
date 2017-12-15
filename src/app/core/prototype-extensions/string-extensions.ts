/**
 * The intent here is to extend String functionality on its prototype
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

interface String {

    /**
     * There are two ways to use this:
     *
     * 1. Object mappings =>
     * `'Hello {you}, I'm {me}!'.format({ you: 'Jane', me: 'Tarzan'})`
     *
     * 2. `...arguments[]` of any type =>
     * `'Magic {0} interpolation {1}!'.format('is in', 'shenanigans')`
     *
     * In the case of object maps, you can interpolate any key with any value.
     *
     * Inspired by StackOverflow's String.prototype.formatUnicorn()
     */
    format(): string;
}


(function() { // anything that is not the interface is not exposed globally

// Guards ==================================================

    if (!String.prototype.format) {
        String.prototype.format = format;
    }



// Functions ==================================================

    function format(...replacements: (string | number | {[key: string]: string})[]): string {
        if (!replacements.length) {
            return this.toString();
        }

        const args = getArgs(replacements);

        return Object.keys(args)
                .reduce((formattedString, key) =>
                    formattedString.replace(new RegExp(`\\{${key}\\}`, 'gi'), args[key]),
                    this.toString()
                );
    }


    ///////


    function getArgs(replacements) {
        if (replacements[0] instanceof Array) {
            return replacements.reduce((args, r) => [...args, r], []);
        }
        if (replacements[0] instanceof Object) {
            return replacements.reduce((args, r) => Object.assign(args, r), {});
        }
        return replacements;
    }

})();
