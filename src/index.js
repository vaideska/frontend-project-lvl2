import getObject from './readFile.js';
import formatResult from './formatters/index.js';
import getDiffObject from './buildDiff.js';

const genDiff = (filepath1, filepath2, format) => {
  let obj1;
  let obj2;
  try {
    obj1 = getObject(filepath1);
    obj2 = getObject(filepath2);
  } catch (e) {
    return e;
  }
  const result = getDiffObject(obj1, obj2);

  return formatResult(result, format);
};

export default genDiff;
