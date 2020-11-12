import getObject from './parsers.js';
import getStringResult from './formatter.js';
import diffObject from './buildDiffObject.js';

const diffFiles = (filepath1, filepath2, format) => {
  let obj1;
  let obj2;
  try {
    obj1 = getObject(filepath1);
    obj2 = getObject(filepath2);
  } catch (e) {
    return e;
  }
  const result = diffObject(obj1, obj2);

  return getStringResult(result, format);
};

export default diffFiles;
