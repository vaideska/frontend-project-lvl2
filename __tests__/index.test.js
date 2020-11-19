import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

const readFixture = (nameFile) => fs.readFileSync(getFixturePath(`${nameFile}.txt`), 'utf8');

const dataSucessTest = [
  ['.json', '.json'],
  ['.json', '.yml'],
  ['.yml', '.yml'],
];

test.each(dataSucessTest)('formatStylish', (fileExtension1, fileExtension2) => {
  const result = genDiff(getFixturePath(`file1${fileExtension1}`), getFixturePath(`file2${fileExtension2}`));
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
  let result;
  try {
    genDiff(getFixturePath('file1.cfg'), getFixturePath('file2.cfg'));
  } catch (e) {
    result = e;
  }
  const error = new Error('Not found format: cfg');
  expect(result).toEqual(error);
});
