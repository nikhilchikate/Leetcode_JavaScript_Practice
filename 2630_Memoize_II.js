// Given a function fn, return a memoized version of that function.

// A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

// fn can be any function and there are no constraints on what type of values it accepts. Inputs are considered identical if they are === to each other.

 

// Example 1:

// Input: 
// getInputs = () => [[2,2],[2,2],[1,2]]
// fn = function (a, b) { return a + b; }
// Output: [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
// Explanation:
// const inputs = getInputs();
// const memoized = memoize(fn);
// for (const arr of inputs) {
//   memoized(...arr);
// }

// For the inputs of (2, 2): 2 + 2 = 4, and it required a call to fn().
// For the inputs of (2, 2): 2 + 2 = 4, but those inputs were seen before so no call to fn() was required.
// For the inputs of (1, 2): 1 + 2 = 3, and it required another call to fn() for a total of 2.
// Example 2:

// Input: 
// getInputs = () => [[{},{}],[{},{}],[{},{}]] 
// fn = function (a, b) { return ({...a, ...b}); }
// Output: [{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
// Explanation:
// Merging two empty objects will always result in an empty object. It may seem like there should only be 1 call to fn() because of cache-hits, however none of those objects are === to each other.
// Example 3:

// Input: 
// getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
// fn = function (a, b) { return ({...a, ...b}); }
// Output: [{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
// Explanation:
// Merging two empty objects will always result in an empty object. The 2nd and 3rd third function calls result in a cache-hit. This is because every object passed in is identical.
 

// Constraints:

// 1 <= inputs.length <= 105
// 0 <= inputs.flat().length <= 105
// inputs[i][j] != NaN

/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const cache = new Map(); // Cache for results
    let count = 0; // Invocation counter

    return function(...args) {
        let c = cache; // Current cache level
        for (let i = 0; i < args.length; i++) {
            const a = args[i]; // Current argument
            if (!c.has(a)) {
                c.set(a, new Map()); // Create new map if not present
            }
            c = c.get(a); // Move to next cache level
        }
        
        if (c.has('res')) {
            return c.get('res'); // Return cached result
        }

        count++; // Increment call count
        const res = fn(...args); // Compute result
        c.set('res', res); // Cache the result

        return res; // Return computed result
    };
}

/** 
 * // Example usage
 * let count = 0; // Invocation counter
 * const memoizedAdd = memoize(function (x, y) {
 *     count += 1; // Increment count
 *     return x + y; // Return sum
 * });
 * console.log(memoizedAdd(2, 3)); // 5
 * console.log(memoizedAdd(2, 3)); // 5
 * console.log(memoizedAdd(1, 2)); // 3
 * console.log(count); // 2

 * const o1 = {}; // First object
 * const o2 = {}; // Second object
 * const memoizedMerge = memoize(function (a, b) {
 *     return ({...a, ...b}); // Merge objects
 * });
 * console.log(memoizedMerge(o1, o2)); // {}
 * console.log(memoizedMerge(o1, o2)); // {}
 * console.log(memoizedMerge({}, {})); // {}
 * console.log(count); // 3
 */
