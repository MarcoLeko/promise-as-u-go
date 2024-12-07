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
