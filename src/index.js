import getObject from './readFile.js';
import formatResult from './formatters/index.js';
import getDiffObject from './buildDiff.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const result = getDiffObject(obj1, obj2);

  return formatResult(result, format);
};

export default genDiff;
