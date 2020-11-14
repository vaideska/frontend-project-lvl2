import fs from 'fs';
import diffFiles from '../src/diff.js';

// eslint-disable-next-line no-undef
test('YAMLStylish', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.yml', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultStylish.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('YAMLwithJSONStylish', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.json', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultStylish.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('YAMLPlain', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.yml', 'plain');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultPlain.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('YAMLwithJSONPlain', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.json', 'plain');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultPlain.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('YAMLjson', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json', 'json');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultJSON.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});

// eslint-disable-next-line no-undef
test('YAMLwithJSONjson', () => {
  const result = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml', 'json');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultJSON.txt', 'utf8');
  // eslint-disable-next-line no-undef
  expect(result).toEqual(expectResult);
});
