/**
 * The intent here is to extend String functionality on its prototype
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
