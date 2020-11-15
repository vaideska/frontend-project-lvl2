import fs from 'fs';
import diffFiles from '../src/diff.js';

test('YAMLStylish', () => {
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.yml', 'stylish');
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.json', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultStylish.txt', 'utf8');
  expect(resultYAML).toEqual(expectResult);
  expect(resultJSON).toEqual(expectResult);
});

test('YAMLPlain', () => {
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.yml', 'plain');
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.json', 'plain');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultPlain.txt', 'utf8');
  expect(resultYAML).toEqual(expectResult);
  expect(resultJSON).toEqual(expectResult);
});

test('YAMLjson', () => {
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.yml', 'json');
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.yml', './__tests__/__fixtures__/file2.json', 'json');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultJSON.txt', 'utf8');
  expect(resultYAML).toEqual(expectResult);
  expect(resultJSON).toEqual(expectResult);
});
