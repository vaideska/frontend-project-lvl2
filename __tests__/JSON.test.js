import fs from 'fs';
import diffFiles from '../src/diff.js';

test('JSONStylish', () => {
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json', 'stylish');
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml', 'stylish');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultStylish.txt', 'utf8');
  expect(resultJSON).toEqual(expectResult);
  expect(resultYAML).toEqual(expectResult);
});

test('JSONPlain', () => {
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json', 'plain');
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml', 'plain');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultPlain.txt', 'utf8');
  expect(resultJSON).toEqual(expectResult);
  expect(resultYAML).toEqual(expectResult);
});

test('JSONjson', () => {
  const resultJSON = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.json', 'json');
  const resultYAML = diffFiles('./__tests__/__fixtures__/file1.json', './__tests__/__fixtures__/file2.yml', 'json');
  const expectResult = fs.readFileSync('./__tests__/__fixtures__/resultJSON.txt', 'utf8');
  expect(resultJSON).toEqual(expectResult);
  expect(resultYAML).toEqual(expectResult);
});
