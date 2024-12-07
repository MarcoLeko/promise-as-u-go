/**
 * A utility function that handles promise returns as values. It catches errors
 * based on the provided list of error classes and returns the result accordingly.
 *
 * @template T - The type of the resolved value of the promise.
 * @template E - The type of the error classes to catch. These must be classes (constructors)
 *               that extend the built-in `Error` class.
 *
 * @param {Promise<T>} promise - The promise to be executed.
 * @param {E[]} [errorsToCatch] - An optional array of error classes to catch. If not provided,
 *                                any error will be caught.
 *
 * @returns {Promise<readonly [undefined, T] | [Error]>} - A promise that resolves to a tuple:
 *   - If the promise resolves successfully, the tuple will be `[undefined, result]`.
 *   - If an error is caught:
 *     - If the error matches one of the classes in `errorsToCatch`, the tuple will be `[error]`.
 *     - If the error doesn't match any of the provided classes, the error will be re-thrown.
 *
 * @example
 * // Catch a specific error class
 * class SpecificError extends Error {}
 *
 * async function test() {
 *   const result = await tryCatchOn(
 *     Promise.reject(new SpecificError('Something went wrong')),
 *     [SpecificError]
 *   );
 *   console.log(result); // [SpecificError]
 * }
 *
 * @example
 * // Catch any error
 * async function test() {
 *   const result = await tryCatchOn(Promise.reject(new Error('Something failed')));
 *   console.log(result); // [Error: Something failed]
 * }
 */
async function tryCatchOn<T, E extends new (
) => InstanceType<ErrorConstructor>>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<readonly [undefined, T] | [Error]> {
  return promise
    .then((resolve) => [undefined, resolve] as const)
    .catch((error) => {
      if (typeof errorsToCatch === 'undefined') {
        return [error] as const;
      }

      if (Array.isArray(errorsToCatch) && errorsToCatch.some((e) => error instanceof e)) {
        return [error] as const;
      }

      throw error;
    });
}

export { tryCatchOn };
