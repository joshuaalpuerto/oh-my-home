/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
export const switchFn = cases => defaultCase => key =>
key in cases ? cases[key] : defaultCase
