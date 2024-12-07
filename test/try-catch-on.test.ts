// eslint-disable-next-line max-classes-per-file
import { tryCatchOn } from '../src';

class SpecificError extends Error {
}

class AnotherError extends Error {
}

// Mock promise functions
const resolvePromise = (value: any) => Promise.resolve(value);
const rejectPromise = (error: Error) => Promise.reject(error);

describe('tryCatchOn', () => {
  it('should return resolved value as a tuple', async () => {
    const result = await tryCatchOn(resolvePromise('success'));

    expect(result).toEqual([undefined, 'success']);
  });

  it('should return a tuple with error if no errorsToCatch is provided', async () => {
    const error = new SpecificError('failure');
    const result = await tryCatchOn(rejectPromise(error));

    expect(result).toEqual([error]);
  });

  it('should catch specified errors and return them in a tuple', async () => {
    const error = new SpecificError('specific failure');
    const result = await tryCatchOn(rejectPromise(error), [SpecificError]);

    expect(result).toEqual([error]);
  });

  it('should rethrow errors not in errorsToCatch', async () => {
    const error = new AnotherError('unexpected failure');

    await expect(() => tryCatchOn(rejectPromise(error), [SpecificError])).rejects.toThrow(error);
  });

  it('should handle multiple errors in errorsToCatch', async () => {
    const error = new AnotherError('another failure');
    const result = await tryCatchOn(rejectPromise(error), [SpecificError, AnotherError]);

    expect(result).toEqual([error]);
  });

  it('should handle undefined errorsToCatch gracefully', async () => {
    const error = new Error('general failure');
    const result = await tryCatchOn(rejectPromise(error));

    expect(result).toEqual([error]);
  });
});
