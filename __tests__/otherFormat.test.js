import diffFiles from '../src/diff.js';

// eslint-disable-next-line no-undef
test('errorFormat', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.cfg', './__tests__/__fixtures__/file2.cfg');
  const error = new Error('Not found format');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(error);
});

// eslint-disable-next-line no-undef
test('errorFilePath', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.txt', './__tests__/__fixtures__/file2.txt');
  const error = new Error('Not found file');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(error);
});
