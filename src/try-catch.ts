/**
 * A utility function that handles promise returns as values. It catches any error that
 * occurs and returns the result accordingly.
 *
 * @template T - The type of the resolved value of the promise.
 *
 * @param {Promise<T>} promise - The promise to be executed.
 *
 * @returns {Promise<readonly [undefined, T] | [Error]>} - A promise that resolves to a tuple:
 *   - If the promise resolves successfully, the tuple will be `[undefined, result]`.
 *   - If an error is caught, the tuple will be `[error]`.
 *
 * @example
 * // Example of catching an error
 * async function test() {
 *   const result = await tryCatch(Promise.reject(new Error('Something went wrong')));
 *   console.log(result); // [Error: Something went wrong]
 * }
 *
 * @example
 * // Example of successful promise resolution
 * async function test() {
 *   const result = await tryCatch(Promise.resolve('Success'));
 *   console.log(result); // [undefined, 'Success']
 * }
 */
async function tryCatch<T>(
  promise: Promise<T>,
): Promise<readonly [undefined, T] | [Error]> {
  return promise
    .then((resolve) => [undefined, resolve] as const)
    .catch((error) => [error] as const);
}

export { tryCatch };
