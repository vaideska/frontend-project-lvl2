import { forEach } from 'lodash';
import diffFiles from '../src/diff.js';

let dataTests;

beforeAll(() => {
  dataTests = [
    { file: '.cfg', error: 'Not found format' },
    { file: '.txt', error: 'Not found file' },
  ];
});

test('errorFormat', () => {
  dataTests.forEach((data) => {
    const result = diffFiles(`./__tests__/__fixtures__/file1${data.file}`, `./__tests__/__fixtures__/file2${data.file}`);
    const error = new Error(data.error);
    expect(result).toEqual(error);
  });
});
