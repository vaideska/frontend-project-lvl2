import diffFiles from '../src/diff.js';

test('errorFormat', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.cfg', './__tests__/__fixtures__/file2.cfg');
  const error = new Error('Not found format');
  expect(result).toEqual(error);
});

test('errorFilePath', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.txt', './__tests__/__fixtures__/file2.txt');
  const error = new Error('Not found file');
  expect(result).toEqual(error);
});
