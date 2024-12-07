# Promise-as-U-Go

`promise-as-u-go` is a small utility library that provides two functions to handle promises with built-in error catching and easier management of results. It wraps your promises in a try/catch block and returns consistent outcomes—whether the promise resolves or rejects—allowing you to handle errors gracefully while maintaining clean and readable code.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
    - [tryCatch](#trycatch)
    - [tryCatchOn](#trycatchon)
- [API](#api)
    - [tryCatch](#trycatch-1)
    - [tryCatchOn](#trycatchon-1)
- [License](#license)

## Installation

To install `promise-as-u-go`, use npm or yarn:

```bash
npm install promise-as-u-go
```
or

```bash
yarn add promise-as-u-go
```

## Usage

The library exposes two functions: `tryCatch` and `tryCatchOn`.

### tryCatch

tryCatch is a utility function that wraps a promise and handles errors. It returns a tuple with the result or an error.

Example: Catching Errors

```ts
import { tryCatch } from 'promise-as-u-go';

async function example() {
  const [error, result] = await tryCatch(Promise.reject(new Error('Something went wrong')));
  if (error) {
    console.error('Caught error:', error);
  } else {
    console.log('Promise resolved:', result);
  }
}

example(); // Caught error: Error: Something went wrong
```

If the promise resolves successfully, tryCatch returns `[undefined, result]`. If the promise is rejected, it returns `[error]`.

### tryCatchOn

`tryCatchOn` allows you to catch specific types of errors by providing a list of error classes (constructors). This is useful when you want to handle particular types of errors differently.

Example: Catching Specific Errors

```ts
import { tryCatchOn } from 'promise-as-u-go';

class SpecificError extends Error {}

async function example() {
  const [error, result] = await tryCatchOn(
    Promise.reject(new SpecificError('A specific error occurred')),
    [SpecificError] // Only catch SpecificError
  );
  
  if (error) {
    console.error('Caught specific error:', error);
  } else {
    console.log('Promise resolved:', result);
  }
}

example(); // Caught specific error: SpecificError: A specific error occurred
```

If the promise is rejected and the error matches one of the classes in the errorsToCatch array, tryCatchOn returns [error]. Otherwise, it rethrows the error.

Example: Catching Any Error
```ts
import { tryCatchOn } from 'promise-as-u-go';

async function example() {
  const [error, result] = await tryCatchOn(
    Promise.reject(new Error('A general error occurred'))
  );
  
  if (error) {
    console.error('Caught error:', error);
  } else {
    console.log('Promise resolved:', result);
  }
}

example(); // Caught error: Error: A general error occurred
```

## API

### tryCatch

```ts
declare async function tryCatch<T>(
  promise: Promise<T>
): Promise<readonly [undefined, T] | [Error]>;
```

### tryCatchOn

```ts
declare async function tryCatchOn<T, E extends new (...args: any[]) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<readonly [undefined, T] | [Error]>;
```

## License

Apache-2.0 © Marco Leko
