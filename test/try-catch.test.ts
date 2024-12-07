import { tryCatch } from '../src';

describe('tryCatch', () => {
  it('should return a tuple with undefined and the resolved value when the promise resolves', async () => {
    const mockPromise = Promise.resolve('success');
    const result = await tryCatch(mockPromise);

    expect(result).toEqual([undefined, 'success']);
  });

  it('should return a tuple with the error when the promise rejects', async () => {
    const mockError = new Error('failure');
    const mockPromise = Promise.reject(mockError);
    const result = await tryCatch(mockPromise);

    expect(result).toEqual([mockError]);
  });

  it('should handle promises resolving to undefined correctly', async () => {
    const mockPromise = Promise.resolve(undefined);
    const result = await tryCatch(mockPromise);

    expect(result).toEqual([undefined, undefined]);
  });

  it('should handle promises rejecting with non-Error values', async () => {
    const mockRejection = 'string error';
    const mockPromise = Promise.reject(mockRejection);
    const result = await tryCatch(mockPromise);

    expect(result).toEqual([mockRejection]);
  });

  it('should not modify the original promise', async () => {
    const mockPromise = Promise.resolve('original value');

    // Use the promise without await to ensure it's still usable later
    const result = await tryCatch(mockPromise);

    expect(await mockPromise).toBe('original value');
    expect(result).toEqual([undefined, 'original value']);
  });
});
