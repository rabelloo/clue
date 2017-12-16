/**
 * The intent here is to extend String functionality on its prototype
 * or "fix" whatever may be incorrect for this app's purpose.
 *
 * DO NOT use arrow functions as they capture the wrong `this` as `window`
 *
 * This file (.ts):
 *  - Logic guards for the extensions
 *  - Function implementations
 *  - Private helpers
 *
 * Other file (.d.ts):
 *  - Interface for TS typings
 */


// Guards ==================================================

if (!String.prototype.format) {
    String.prototype.format = format;
}



// Function implementations ================================

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


// Private helpers =========================================

function getArgs(replacements) {
    if (replacements[0] instanceof Array) {
        return replacements.reduce((args, r) => [...args, r], []);
    }
    if (replacements[0] instanceof Object) {
        return replacements.reduce((args, r) => Object.assign(args, r), {});
    }
    return replacements;
}
