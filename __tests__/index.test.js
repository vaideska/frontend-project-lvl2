import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__tests__/__fixtures__', filename);

const readFixture = (nameResultFile) => fs.readFileSync(getFixturePath(`${nameResultFile}.txt`), 'utf8');

const dataSucessTest = [
  ['.json', '.json'],
  ['.json', '.yml'],
  ['.yml', '.yml'],
];

const dataErrorTest = [
  ['.cfg', 'Not found format'],
];

test.each(dataSucessTest)('formatStylish', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`), '');
  const expectResult = readFixture('stylish');
  expect(result).toEqual(expectResult);
});

test.each(dataSucessTest)('formatPlain', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`), 'plain');
  const expectResult = readFixture('plain');
  expect(result).toEqual(expectResult);
});

test.each(dataSucessTest)('formatJSON', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`), 'json');
  const expectResult = readFixture('json');
  expect(result).toEqual(expectResult);
});

test('errorTests', () => {
  const result = genDiff(getFixturePath('file1.cfg'), getFixturePath('file2.cfg'));
  const error = new Error('Not found format: .cfg');
  expect(result).toEqual(error);
});
