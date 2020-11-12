import fs from 'fs';
import diffFiles from '../src/diff.js';

// eslint-disable-next-line no-undef
test('JSON', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/goodResult.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('JSONwithYAML', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/goodResult.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});
