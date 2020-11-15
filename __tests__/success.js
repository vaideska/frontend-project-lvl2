import fs from 'fs';
import diffFiles from '../src/diff.js';

let dataTests;

beforeAll(() => {
  dataTests = [
    { file1: '.json', file2: '.json', format: 'stylish' },
    { file1: '.json', file2: '.yml', format: 'stylish' },
    { file1: '.json', file2: '.json', format: 'plain' },
    { file1: '.json', file2: '.yml', format: 'plain' },
    { file1: '.json', file2: '.json', format: 'json' },
    { file1: '.json', file2: '.yml', format: 'json' },
    { file1: '.yml', file2: '.yml', format: 'stylish' },
    { file1: '.yml', file2: '.json', format: 'stylish' },
    { file1: '.yml', file2: '.yml', format: 'plain' },
    { file1: '.yml', file2: '.json', format: 'plain' },
    { file1: '.yml', file2: '.yml', format: 'json' },
    { file1: '.yml', file2: '.json', format: 'json' },
  ];
});

test('JSONTest', () => {
  dataTests.forEach((data) => {
    const result = diffFiles(`./__tests__/__fixtures__/file1${data.file1}`, `./__tests__/__fixtures__/file2${data.file2}`, data.format);
    const expectResult = fs.readFileSync(`./__tests__/__fixtures__/${data.format}.txt`, 'utf8');
    expect(result).toEqual(expectResult);
  });
});
