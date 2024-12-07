async function tryResolve<T>(
  promise: Promise<T>,
): Promise<readonly [undefined, T] | [Error]> {
  return promise
    .then((resolve) => [undefined, resolve] as const)
    .catch((error) => [error] as const);
}

export { tryResolve };
