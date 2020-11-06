import fs from 'fs';
import diffFiles from '../src/diff.js';

// eslint-disable-next-line no-undef
test('flatJSON', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/goodResult.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('flatJSONwithFlatYAML', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/goodResult.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});
