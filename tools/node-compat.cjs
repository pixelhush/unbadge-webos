// Restore util.is* helpers removed in newer Node that ares-cli still calls.
const u = require('util');
const shims = {
  isDate: (d) => d instanceof Date, isRegExp: (r) => r instanceof RegExp, isError: (e) => e instanceof Error,
  isArray: Array.isArray, isFunction: (f) => typeof f === 'function', isString: (s) => typeof s === 'string',
  isNumber: (n) => typeof n === 'number', isObject: (o) => o !== null && typeof o === 'object',
  isBoolean: (b) => typeof b === 'boolean', isUndefined: (v) => v === undefined, isNull: (v) => v === null,
  isNullOrUndefined: (v) => v == null, isPrimitive: (v) => v === null || (typeof v !== 'object' && typeof v !== 'function'),
  isBuffer: Buffer.isBuffer, isSymbol: (s) => typeof s === 'symbol',
};
for (const [k, f] of Object.entries(shims)) if (typeof u[k] !== 'function') u[k] = f;
