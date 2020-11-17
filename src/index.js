import getObject from './parsers.js';
import getStringResult from './formatters/index.js';
import diffObject from './buildDiffObject.js';

const genDiff = (filepath1, filepath2, format) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const result = diffObject(obj1, obj2);

  return getStringResult(result, format);
};

export default genDiff;
