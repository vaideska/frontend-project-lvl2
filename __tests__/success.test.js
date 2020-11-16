import fs from 'fs';
import path from 'path';
import genDiff from '../bin/index.js';

const readFixture = (nameResultFile) => fs.readFileSync(path.resolve('./__tests__/__fixtures__/', `${nameResultFile}.txt`), 'utf8');

const dataSucessTest = [
  ['.json', '.json', 'stylish'],
  ['.json', '.json', 'plain'],
  ['.json', '.json', 'json'],
  ['.json', '.yml', 'stylish'],
  ['.json', '.yml', 'plain'],
  ['.json', '.yml', 'json'],
  ['.yml', '.yml', 'stylish'],
  ['.yml', '.yml', 'plain'],
  ['.yml', '.yml', 'json'],
  ['.json', '.json', '', 'stylish'],
  ['.json', '.yml', '', 'stylish'],
  ['.yml', '.yml', '', 'stylish'],
];

const dataErrorTest = [
  ['.cfg', 'Not found format'],
  ['.txt', 'Not found file'],
];

test.each(dataSucessTest)('allFormates', (fileExtension1, fileExtension2, format, nameResultFile = format) => {
  const result = genDiff(path.resolve('./__tests__/__fixtures__/', `file1${fileExtension1}`), path.resolve('./__tests__/__fixtures__/', `file2${fileExtension2}`), format);
  const expectResult = readFixture(nameResultFile);
  expect(result).toEqual(expectResult);
});

test.each(dataErrorTest)('errorTests', (fileExtension, errorText) => {
  const result = genDiff(path.resolve('./__tests__/__fixtures__/', `file1${fileExtension}`), path.resolve('./__tests__/__fixtures__/', `file2${fileExtension}`));
  const error = new Error(errorText);
  expect(result).toEqual(error);
});
